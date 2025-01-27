const popup = document.getElementById("popup");
        const cefetLink = document.getElementById("cefet-link");

        cefetLink.addEventListener("mouseover", (event) => {
            popup.style.display = "block";
            const rect = event.target.getBoundingClientRect(); 

            let top = rect.bottom + window.scrollY + 10; 
            let left = rect.left + window.scrollX;

            if (left + popup.offsetWidth > window.innerWidth) {
                left = window.innerWidth - popup.offsetWidth - 10;
            }

            if (top + popup.offsetHeight > window.innerHeight) {
                top = rect.top + window.scrollY - popup.offsetHeight - 10;
            }

            popup.style.top = `${top}px`;
            popup.style.left = `${left}px`;
        });

        cefetLink.addEventListener("mouseout", () => {
            popup.style.display = "none";
        });