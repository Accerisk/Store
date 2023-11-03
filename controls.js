const list = document.querySelector('#ulList');
const productTable1 = document.querySelector('#productTable');


if (list) {
    list.addEventListener('input', (e) => {
        if (e.target.className === 'amount') {
            const li = e.target.parentElement.parentElement;
            const price = li.querySelector('.price');
            const total = li.querySelector('.totalPrice');
            const amount = e.target.value;

            // Extract the numeric price from the text content
            const numericPrice = parseFloat(price.textContent);

            if (e.target.value !== "") {
                // Calculate the total price
                const totalPrice = numericPrice * amount;

                // Update the price element with the calculated total
                total.value = totalPrice.toFixed(2);
            } else {
                // Reset the input value to 1 and display the original price
                e.target.value = 1;
                total.value = numericPrice.toFixed(2);
            }
        }
    });
}


const popForm = document.querySelector('.form-popup');
  if(popForm){
                function openForm() {
                    popForm.style.display = "block";
                            }

                function closeForm() {
                    popForm.style.display = "none";
                            }
                function addRow() {
                    const productNameInput = document.querySelector('#productName');
                    const productTable = document.querySelector('#productTable');
                
                    if (productNameInput && productTable ) {
                        const productName = productNameInput.value;
                        const rows = productTable.rows;
                        let isDuplicate = false;
                
                        // Check for duplicates in the first cell (Product Name)
                        for (let i = 1; i < rows.length; i++) {
                            const cell = rows[i].cells[0];
                            if (cell.textContent === productName) {
                                isDuplicate = true;
                                break;
                            }
                        }
                console.log(productNameInput.value);
                        if (!isDuplicate && productNameInput.value != "" ) {
                            // If it's not a duplicate, add a new row
                            const newRow = productTable.insertRow(-1);
                            const nameCell = newRow.insertCell(0);
                            const priceCell = newRow.insertCell(1);
                            const qtyCell = newRow.insertCell(2);
                            const srpCell = newRow.insertCell(3);
                
                            nameCell.innerHTML = productName;
                            priceCell.innerHTML = document.querySelector('#pricePerPack').value;
                            qtyCell.innerHTML = document.querySelector('#quantitypp').value;
                            srpCell.innerHTML = document.querySelector('#sRP').value;
                            rows[2].style.display="none";

                            closeForm();
                        } else if (productNameInput.value == "") {
                            alert('One or more Space are blank');
                        } else {
                            alert('Product name already exists. Please enter a different name.');
                        }
                    }
                }

                function search(){

                    const searchInput = document.querySelector('#searchBox').value.toLowerCase();
                    const productTable = document.querySelector('#productTable');
                    const rows = productTable.rows;

                 
                
                        for (let i = 1; i < rows.length; i++) {
                            const cell = rows[i].cells[0];
                            if (cell.textContent.toLowerCase().indexOf(searchInput) > -1) {
                                rows[i].style.display = "";
                              } else {
                                rows[i].style.display = "none";
                              }
                        }               
                
    
    }   
}


function addLastRow(doc){
    let tr = document.createElement('tr');
    let name = document.createElement('td');
    let price = document.createElement('td');
    let qpp = document.createElement('td');
    let srp = document.createElement('td');

    name.textContent = doc.data().name;
    price.textContent = doc.data().price;
    qpp.textContent = doc.data().qtypp;
    srp.textContent = doc.data().retail_price;

    tr.appendChild(name);
    tr.appendChild(price);
    tr.appendChild(qpp);
    tr.appendChild(srp);


    productTable1.appendChild(tr);

}


db.collection('Product Name').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        console.log(change.doc.data());
        if(change.type == 'added'){
            addLastRow(change.doc);
        } 
    });
});
