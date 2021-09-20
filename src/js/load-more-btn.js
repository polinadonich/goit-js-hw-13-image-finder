const getBtn = document.querySelector('.btn');

export default class LoadMoreBtn {

    show() {
        getBtn.removeAttribute('hidden');
    }

}