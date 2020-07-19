function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

function modal(dataSelector, modalSelector, modalTimerId) {
    
    // Modal

    const dataModal = document.querySelectorAll(dataSelector),
          modal = document.querySelector(modalSelector);

    dataModal.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    function openModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document. documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', openModalByScroll);
        }
    }

    window.addEventListener('scroll', openModalByScroll);
}

export default modal;
export {closeModal, openModal};