// 로컬 스토리지 키
const HISTORY_KEY = 'feedback_pages_history';

// 페이지 로드 시 실행
        document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('createForm');
            const imageGrid = document.getElementById('imageGrid');
            
            // 이미지 선택 이벤트
            imageGrid.addEventListener('click', function(e) {
                const option = e.target.closest('.image-option');
                if (option) {
                    document.querySelectorAll('.image-option').forEach(opt => {
                        opt.classList.remove('selected');
                    });
                    option.classList.add('selected');
                }
            });

            // 폼 제출
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // 입력값 검증
                if (!validateForm()) {
                    return;
                }

                // URL 생성
                const url = generateUrl();
                
                // URL 표시
                document.getElementById('urlPreview').style.display = 'block';
                document.getElementById('generatedUrl').textContent = url;

                // 히스토리에 저장
                saveToHistory({
                    title: document.getElementById('pageTitle').value,
                    url: url,
                    timestamp: new Date().toISOString()
                });

                // 히스토리 목록 업데이트
                updateHistoryList();
            });

            // 초기 히스토리 목록 로드
            updateHistoryList();
        });

        // 폼 검증
        function validateForm() {
            let isValid = true;
            
            // 제목 검증
            const title = document.getElementById('pageTitle').value;
            if (!title) {
                showError('titleError', '제목을 입력해주세요');
                isValid = false;
            }

            // 시트 ID 검증
            const sheetId = document.getElementById('sheetId').value;
            if (!sheetId) {
                showError('sheetError', '구글 시트 ID를 입력해주세요');
                isValid = false;
            }

            // 웹앱 URL 검증
            const webAppUrl = document.getElementById('webAppUrl').value;
            if (!webAppUrl || !isValidUrl(webAppUrl)) {
                showError('urlError', '올바른 URL을 입력해주세요');
                isValid = false;
            }

            // 이미지 선택 검증
            const selectedImage = document.querySelector('.image-option.selected');
            if (!selectedImage) {
                alert('미리보기 이미지를 선택해주세요');
                isValid = false;
            }

            return isValid;
        }

        // URL 검증
        function isValidUrl(url) {
            try {
                new URL(url);
                return true;
            } catch {
                return false;
            }
        }

        // 에러 표시
        function showError(elementId, message) {
            const error = document.getElementById(elementId);
            error.textContent = message;
            error.style.display = 'block';
        }

        // URL 생성
        function generateUrl() {
            const baseUrl = window.location.origin + '/feedback.html';
            const title = encodeURIComponent(document.getElementById('pageTitle').value);
            const sheetId = encodeURIComponent(document.getElementById('sheetId').value);
            const webAppUrl = encodeURIComponent(document.getElementById('webAppUrl').value);
            const selectedImage = document.querySelector('.image-option.selected');
            const image = selectedImage ? encodeURIComponent(selectedImage.dataset.image) : '';

            return `${baseUrl}?title=${title}&sheetId=${sheetId}&webAppUrl=${webAppUrl}&image=${image}`;
        }

        // 히스토리 저장
        function saveToHistory(page) {
            const history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
            history.unshift(page);
            if (history.length > 10) history.pop(); // 최대 10개 저장
            localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
        }

        // 히스토리 목록 업데이트
        function updateHistoryList() {
            const history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
            const historyList = document.getElementById('historyList');
            
            historyList.innerHTML = history.map(page => `
                <div class="history-item">
                    <div class="history-item-title">${page.title}</div>
                    <button class="copy-button" onclick="copyUrl('${page.url}')">URL 복사</button>
                </div>
            `).join('');
        }

        // URL 복사
        function copyUrl(url) {
            navigator.clipboard.writeText(url).then(() => {
                alert('URL이 복사되었습니다.');
            }).catch(err => {
                console.error('URL 복사 실패:', err);
                alert('URL 복사에 실패했습니다.');
            });
        }
