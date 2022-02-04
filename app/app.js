(()=>{
    class CustomTables{
        /**
         * Конструктор таблицы
         * @param {String} tableId id таблицы
         */
        constructor(tableId){
            this.tableContainer = document.querySelector("#" + tableId);
            this.cssClassList = {
                scrollClue: "horizontal-scroll",
                tableWrapper: "table-wrapper",
                table: "table",
                showMoreBtn: "show-all",
                showMoreBox: "table-content-wrapper",
                showMoreSwitch: "table-content-wrapper_expanded",
                helpBox: "table__popup-help",
                helpIcon: "help-icon",
                showHelpSwitch: "table__popup-help_active",
                hideScrollSwitch: "horizontal-scroll_hide"
            };
            this.table = this.tableContainer.querySelector("." + this.cssClassList.table);
            this.tableWrapper = this.tableContainer.querySelector("." + this.cssClassList.tableWrapper);
            this.scroll = this.tableContainer.querySelector("." + this.cssClassList.scrollClue);
    
            this.showMoreBtn = this.tableContainer.querySelector("." + this.cssClassList.showMoreBtn);
            this.showMoreBox = this.tableContainer.querySelector("." + this.cssClassList.showMoreBox);
            
            this.toggleVisibleScroll();
            this.setHandlers();
        }
        // ---------- get ----------
        /**
         * Возвращает текущую ширину таблицы
         * @returns Float ширина таблицы
         */
        getTableWidth(){
            const tableStyle = window.getComputedStyle(this.table);
            
            return parseFloat(tableStyle.width);
        }
        /**
         * Возвращает ширину обёртки таблицы
         * @returns Float ширина обёртки тиблицы
         */
        getTableWrapperWidth(){
            const tableWrapperStyle = window.getComputedStyle(this.tableWrapper);
    
            return parseFloat(tableWrapperStyle.width);
        }
        // ---------- set ----------
        /**
         * Установка обработчиков событий
         */
        setHandlers(){
            const handleShowScrollEvent = this.handleShowScrollEvent.bind(this);
            window.addEventListener('resize', handleShowScrollEvent);
    
            const handleShowMoreTableEvent = this.handleShowMoreTableEvent.bind(this);
            this.showMoreBtn.addEventListener('click', handleShowMoreTableEvent);
    
            const handleGetHelpEvent = this.handleGetHelpEvent.bind(this);
            this.tableContainer.addEventListener('click', handleGetHelpEvent);
        }
        // ---------- handlers ----------
        /**
         * Обработчик клика по надписи "показать полностью"
         */
        handleShowMoreTableEvent(){
            this.showEntireTable();
        }
        /**
         * Обработчик изменения размеров окна просмотра
         * скрывает надпись "горизонтальный скролл"
         * если в ней нет необходимости
         */
        handleShowScrollEvent(){
            this.toggleVisibleScroll();
        }
        /**
         * Обработчик клика по кнопке помощи
         * @param {Event} event объект события
         */
        handleGetHelpEvent(event){
            let openedHelpBoxes = this.table.querySelectorAll("." + this.cssClassList.showHelpSwitch);
            // убираем все всплывающие подсказки
            this.hideAllHelpBoxes();
    
            const helpIcon = event.target.closest("." + this.cssClassList.helpIcon);
    
            if(helpIcon !== null){
                let helpBox = helpIcon.parentElement.querySelector("." + this.cssClassList.helpBox);
                if(helpBox !== null && !this.containsInList(openedHelpBoxes, helpBox)){
                    helpBox.classList.add(this.cssClassList.showHelpSwitch);
                }
            } 
        }
        // ---------- contains ----------
        /**
         * Проверяет наличие el в списке элемнетов list
         * @param {HTMLCollectin} list 
         * @param {HTMLElement} el 
         * @returns true, если el есть в списке list
         */
        containsInList(list, el){
            for(let i = 0; i < list.length; i++){
                if(list[i] === el) return true;
            }
            return false;
        }
        // ---------- show ----------
        /**
         * Показывает надпись "горизонтальный скролл"
         */
        showScroll(){
            const self = this;
            window.requestAnimationFrame(() => {
                if(self.scroll.classList.contains(self.cssClassList.hideScrollSwitch)){
                    self.scroll.classList.remove(self.cssClassList.hideScrollSwitch);
                }
            });
        }
        /**
         * Показывает скрытую часть таблицы (раскрывает таблицу)
         */
        showEntireTable(){
            const self = this;
            window.requestAnimationFrame(() => {
                if( !self.showMoreBox.classList.contains(self.cssClassList.showMoreSwitch) ){
                    self.showMoreBox.classList.add(self.cssClassList.showMoreSwitch);
                }
            });
        }
        // ---------- hide ----------
        /**
         * Скрывает надпись "горизонтальный скролл"
         */
        hideScroll(){
            const self = this;
            window.requestAnimationFrame(() => {
                if(!self.scroll.classList.contains(self.cssClassList.hideScrollSwitch)){
                    self.scroll.classList.add(self.cssClassList.hideScrollSwitch);
                }
            });
        }
        /**
         * скрывает часть таблицы (сворачивает таблицу)
         */
        hideEntireTable(){
            const self = this;
            window.requestAnimationFrame(() => {
                if( self.showMoreBox.classList.contains(self.cssClassList.showMoreSwitch) ){
                    self.showMoreBox.classList.remove(self.cssClassList.showMoreSwitch);
                }
            });
        }
        /**
         * Скрывает все окна справки
         */
        hideAllHelpBoxes(){
            const helpBoxes = this.table.querySelectorAll('.' + this.cssClassList.helpBox);
            for(let i = 0; i < helpBoxes.length; i++){
                helpBoxes[i].classList.remove(this.cssClassList.showHelpSwitch);
            }
        }
        // ---------- toogle ----------
        /**
         * Переключает отображение надписи "горизонтальный скролл"
         * (показывает/скрывает)
         */
        toggleVisibleScroll(){
            const tableWidth = this.getTableWidth();
            const tableWrapperWidth = this.getTableWrapperWidth();
            if(tableWidth > tableWrapperWidth){
                this.showScroll();
            } else {
                this.hideScroll();
            }
        }
    
    }
    
    const customTabe = new CustomTables('custom-table');
})();
