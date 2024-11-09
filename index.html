// URL 파라미터 처리
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        title: decodeURIComponent(params.get('title') || '오늘 기억에 남는 내용이 있었나요?🤗'),
        image: decodeURIComponent(params.get('image') || ''),
        ogTitle: decodeURIComponent(params.get('ogTitle') || '피드백을 남겨주세요'),
        sheetId: params.get('sheetId'),
        webAppUrl: params.get('webAppUrl')
    };
}

// 페이지 초기화
function initializePage() {
    const params = getUrlParams();
    
    // 필수 파라미터 체크
    if (!params.sheetId || !params.webAppUrl) {
        document.body.innerHTML = '<div style="text-align: center; padding: 20px;">Invalid URL parameters</div>';
        throw new Error('Missing required URL parameters');
    }

    // 페이지 타이틀 설정
    document.title = params.ogTitle;
    document.getElementById('pageTitle').textContent = params.title;

    // OG 메타 태그 설정
    if (params.image) {
        document.querySelector('meta[property="og:image"]').setAttribute('content', params.image);
        document.querySelector('meta[property="twitter:image"]').setAttribute('content', params.image);
    }
    document.querySelector('meta[property="og:title"]').setAttribute('content', params.ogTitle);
    document.querySelector('meta[property="twitter:title"]').setAttribute('content', params.ogTitle);

    return params;
}

// 폼 제출 처리
async function submitFeedback(feedback, webAppUrl, sheetId) {
    const submitButton = document.getElementById('submitButton');
    const loading = document.getElementById('loading');
    const errorMessage = document.getElementById('errorMessage');
    
    submitButton.disabled = true;
    loading.style.display = 'block';
    errorMessage.style.display = 'none';

    try {
        await fetch(webAppUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                feedback: feedback,
                sheetId: sheetId,
                timestamp: new Date().toISOString()
            })
        });

        document.getElementById('feedbackForm').style.display = 'none';
        document.getElementById('thankYou').style.display = 'block';
        
    } catch (error) {
        errorMessage.textContent = '제출 중 오류가 발생했습니다. 다시 시도해주세요.';
        errorMessage.style.display = 'block';
        submitButton.disabled = false;
    } finally {
        loading.style.display = 'none';
    }
}

// 메인 실행 코드
document.addEventListener('DOMContentLoaded', function() {
    const params = initializePage();
    const form = document.getElementById('feedbackForm');
    const textarea = document.getElementById('feedbackText');
    const charCount = document.getElementById('charCount');

    // 글자 수 카운터
    textarea.addEventListener('input', function() {
        const length = this.value.length;
        charCount.textContent = length;
        
        if (length > 1000) {
            this.value = this.value.substring(0, 1000);
            charCount.textContent = '1000';
        }
    });

    // 폼 제출
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const feedback = textarea.value.trim();
        if (!feedback) {
            alert('내용을 입력해주세요.');
            return;
        }

        submitFeedback(feedback, params.webAppUrl, params.sheetId);
    });
});
