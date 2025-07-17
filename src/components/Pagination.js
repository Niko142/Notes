import { paginationService } from "../services/pagination";

export default function updatePaginationUI(currentValue, totalValue) {
  // Элементы пагинации
  const currentPage = document.querySelector(".pagination__current");
  const totalPage = document.querySelector(".pagination__total");
  const prevBtn = document.querySelector(".pagination__btn--prev");
  const nextBtn = document.querySelector(".pagination__btn--next");

  currentPage.textContent = currentValue;
  totalPage.textContent = totalValue;

  const { hasPrevPage, hasNextPage } = paginationService.getPaginationState();
  prevBtn.disabled = !hasPrevPage;
  nextBtn.disabled = !hasNextPage;
}
