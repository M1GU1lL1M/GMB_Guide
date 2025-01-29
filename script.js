document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.jogo').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.jogo.highlight').forEach(i => i.classList.remove('highlight'));
            item.classList.add('highlight');
            item.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    });

    window.addEventListener('load', () => {
        const timelineItems = document.querySelectorAll('.jogo');
        timelineItems.forEach((item, index) => {
            requestAnimationFrame(() => {
                setTimeout(() => {
                    item.classList.add('fade-in');
                }, index * 150);
            });
        });
    });
});

function filterTimeline(type) {
    document.querySelectorAll('.jogo').forEach(item => {
        if (type === 'all' || item.getAttribute('data-type') === type) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}


document.querySelectorAll('.add').forEach(button => {
    button.addEventListener('click', function () {
        
        const gameDivContent = this.parentElement.innerHTML;

        
        let addedGames = JSON.parse(sessionStorage.getItem('addedGames')) || [];
        
        if (!addedGames.includes(gameDivContent)) {
            addedGames.push(gameDivContent);
            sessionStorage.setItem('addedGames', JSON.stringify(addedGames));
            alert(`O jogo foi adicionado!`);
        } else {
            alert(`O jogo já está na lista!`);
        }
    });
});


/*
$(document).ready(function() {
    // Interatividade para destacar itens da linha do tempo
    $('.jogo').click(function() {
        $('.jogo.highlight').removeClass('highlight');
        $(this).addClass('highlight');
        $('html, body').animate({
            scrollTop: $(this).offset().top - 100  // Ajuste o valor para centralizar o item na tela
        }, 500);
    });

    // Animação de fade-in para os itens da linha do tempo
    $(window).on('load', function() {
        $('.jogo').each(function(index) {
            $(this).delay(index * 150).fadeTo(500, 1);  // Atraso no fade-in
        });
    });
});

// Função de filtro para mostrar/ocultar itens da linha do tempo
function filterTimeline(type) {
    $('.jogo').each(function() {
        if (type === 'all' || $(this).data('type') === type) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
}
*/
