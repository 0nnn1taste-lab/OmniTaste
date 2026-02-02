const form = document.getElementById("searchForm");
const input = document.getElementById("keyword");

// 교보문고 검색 URL (변경 가능)
const KYBOBOOOK_SEARCH = "https://search.kyobobook.co.kr/search?keyword=";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const keyword = input.value.trim();

  if (!keyword) {
    input.focus();
    return;
  }

  const url = KYBOBOOOK_SEARCH + encodeURIComponent(keyword);

  // ✅ 노션 임베드에서 새 탭 열기 추천
  window.open(url, "_blank", "noopener,noreferrer");
});
