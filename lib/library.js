/* ########         -CL Library-          ######## */
/* ########  Author: Christian Halvorsen  ######## */
/* ########        @ChristianHal98        ######## */

(function (window) {
    'use strict';

    // Function contains the library
    function christian_library() {
        // Creates the library object
        let lib = {};
        // Semantic Versioning - MAJOR.MINOR.PATCH
        let version = '0.17.0-alpha';

        /* Library functions */

        // test function to check if library is successfully loaded
        lib.test = () => {
            console.log(`Christians_Library v${version} successfully loaded`);
        }
        
        // Selects an element and returns it using querySelector
        lib.select = (element) => {
            return document.querySelector(element);
        }

        // Selects multiple elements and returns an array using querySelectorAll
        lib.selectAll = (element) => {
            return document.querySelectorAll(element);
        }

        // Prints a string to the selected element
        lib.print = (id, content) => {
            const outputElement = document.querySelector(id);
            // adds to the html element
            outputElement.innerHTML += content;
        }

        // Clears the innerHTML of an element
        lib.clearPrint = (id) => {
            const element = document.querySelector(id);
            element.innerHTML = '';
        }

        // creates a table element out of a two dimentional array
        lib.createTable = (id, arr, firstRowTitle, firstCellTitle) => {
            // Checks if the cellContent is a object
            if (typeof arr === 'object') {
                const table = document.createElement('table');
                table.id = id;
                const tableBody = document.createElement('tbody');
                const tableHead = document.createElement('thead');
                // Creates empty elements outside the loop to speed up the llop.
                let tr;
                let th;
                let thChild;
                let td;
                let tdChild;
                // The first row is 0
                let row = 0;

                // If the first row in the array is title, add th instead of td
                if (firstRowTitle) {
                    tr = document.createElement('tr');
                    for (let i = 0; i < arr[0].length; i++) {
                        th = document.createElement('th');
                        tdChild = document.createTextNode(arr[0][i]);
                        th.appendChild(tdChild);
                        tr.appendChild(th);
                    }
                    tableHead.appendChild(tr);
                    table.appendChild(tableHead);
                    // The first row is 1;
                    row = 1;
                }
                // add the table rows
                for (row; row < arr.length; row++) {
                    tr = document.createElement('tr');
                    // add the cells in the rows
                    for (let cell = 0; cell < arr[row].length; cell++) {
                        // If the first cell should be title
                        if (firstCellTitle && cell === 0) {
                            th = document.createElement('th');
                            thChild = document.createTextNode(arr[row][cell]);
                            // Appends the table content to the table row
                            th.appendChild(thChild);
                            tr.appendChild(th);
                        } else {
                            td = document.createElement('td');
                            tdChild = document.createTextNode(arr[row][cell]);
                            // Appends the table content ot the table row
                            td.appendChild(tdChild)
                            tr.appendChild(td);
                        }
                    }
                    // Appends the table row to the table's body
                    tableBody.appendChild(tr);
                }
                // Appends the table body to the table
                table.appendChild(tableBody);
                // returns the table
                return table;
            }
            // If the cellContent is not an object, throw and error.
            else {
                throw new Error('CL error: arr parameter at createTable() is not an array or object');
            }
        }

        // creates an HTML element ( h1, h2, p, etc.);
        lib.createTextElement = (element, id, text) => {
            const e = document.createElement(element);
            const txt = document.createTextNode(text);
            e.id = id;
            e.appendChild(txt);
            return e;
        }

        // Gets the form, adds an event listener for 'submit'. Also prevents default
        lib.form = (id, callback) => {
            // checks if the id is a string
            if (typeof id != 'string') {
                throw new Error('CL error: id parameter at form() is not a string.');
            }
            // checks if the user have passed in a function or not
            if (callback === undefined || callback === null) {
                throw new Error('CL error: func parameter at form() is undefined')
            }
            const form = document.querySelector(id);
            form.addEventListener('submit', function (evt) {
                evt.preventDefault();
                callback();
            });

        }

        // gets the value from a selected input element
        lib.getInput = (id) => {
            const input = document.querySelector(id);
            if(input.nodeName != 'INPUT'){
                throw new Error('CL Error: target element at getInput is not of the tag input.');
            }
            return input.value;
        }

        // same as getInput, but parses it into a number(float/integer)
        lib.getInputNumber = (id) => {
            const input = document.querySelector(id);
            if (input.nodeName != 'INPUT') {
                throw new Error('CL Error: target element at getInput is not of the tag input.');
            }
            return Number(input.value);
        }

        // Checks if an input element is checked, and returns a true/false
        lib.isChecked = (id) => {
            const checkbox = document.querySelector(id);
            // checks if input is of type checkbox or radio
            if (checkbox.type === 'radio' || checkbox.type === 'checkbox') {
                return checkbox.checked;
            } else {
                throw new Error(`CL error: id parameter of isChecked() is not radio/checbox input. input id=${id} is type:${checkbox.type}`);
            }
        }

        // ads <option> elements to a select element with a one dimentional array.
        lib.addSelectOption = (id, arr) => {
            const select = document.querySelector(id);
            let option;
            let textNode;
            // checks if the targetted html element is a 'SELECT' element or not
            if (select.nodeName != 'SELECT') {
                throw new TypeError(`CL error: target element on addSelectOptions is not a select (html)element.`)
            }
            // checks if the passed arr parameter is an object or not
            if (typeof arr != 'object') {
                throw new TypeError(`CL error: arr parameter is not an array at addSelectoptions()`);
            }
            // for each option in the array, add it to the select html element
            arr.forEach((opt) => {
                option = document.createElement('option');
                textNode = document.createTextNode(opt);
                option.value = '';
                option.name = opt;
                option.appendChild(textNode);
                select.appendChild(option);
            });

        }

        // gets the selected index from the select list and returns it
        lib.getSelectOption = (id) => {
            const select = document.querySelector(id);
            return parseInt(select.selectedIndex);
        }

        // Gets the name of the selected option
        lib.getSelectOptionName = (id) => {
            const select = document.querySelector(id);
            // generates an array of all the options in the select list
            const selectedOption = document.querySelectorAll(id + ' option');
            // find out which option is currently selected            
            const selected = selectedOption[parseInt(select.selectedIndex)];
            // returns the name property of that option tag
            return selected.name;
        }

        // Summarizes an array of numbers
        lib.summarize = (arr) => {
            // checks if the arr parameter is an object or not
            if (typeof arr != 'object') {
                throw new Error('CL Error: arr parameter at summarize() is not an array.');
            }
            let sum = 0;
            for (let i = 0; i < arr.length; i++) {
                // checks if the current index in the array is a number or not
                if (typeof arr[i] != 'number') {
                    throw new Error(`CL Error: '${arr[i]}' is not a number in the array[${i}] given to the CL.summarize(arr) function`);
                }
                sum += arr[i];
            }
            return sum;
        }

        // sets the source of an element
        lib.setSource = (id, source) => {
            const element = document.querySelector(id);
            element.src = source;
        }

        // adds a source tag to a parent video/audio element
        lib.addSource = (id, source, format) => {
            const element = document.querySelector(id);
            const src = document.createElement('source');
            // Checks if the target HTML element is not an audio or video tag.
            if (element.nodeName != 'AUDIO' || element.nodeName != 'VIDEO') {
                throw new Error('CL Error: target element at addSource() is not an audio or video tag');
            }
            // Checks whawwt format the source is in (audio/video)
            if (element.nodeName === 'AUDIO') {
                format = `audio/${format}`;
            } else if (element.nodeName === 'VIDEO') {
                format = `video/${format}`;
            }
            source.src = source;
            source.type = format;
            element.appendChild(source);
        }



        // Returns the library object
        return lib;
    }

    
    // Makes the library globally accesible
    if (typeof (window.CL) === 'undefined') {
        window.CL = christian_library();
    }
})(window);