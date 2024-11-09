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

// ... 이전 피드백 페이지 JavaScript 코드 ...
