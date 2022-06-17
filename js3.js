var listStudent = [];

const excel_file = document.getElementById('excel_file');

excel_file.addEventListener('change', (event) => {

    if(!['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'].includes(event.target.files[0].type))
    {
        document.getElementById('excel_data').innerHTML = '<div class="alert alert-danger">Only .xlsx or .xls file format are allowed</div>';

        excel_file.value = '';

        return false;
    }

    var reader = new FileReader();

    reader.readAsArrayBuffer(event.target.files[0]);

    reader.onload = function(event){

        var data = new Uint8Array(reader.result);

        var work_book = XLSX.read(data, {type:'array'});

        var sheet_name = work_book.SheetNames;

        var sheet_data = XLSX.utils.sheet_to_json(work_book.Sheets[sheet_name[0]], {header:1});

       

        if(sheet_data.length > 0) {
            for(var row = 5; row < sheet_data.length; row++){
                var arr = [];
                for(var cell = 0; cell < sheet_data[row].length; cell ++) {
                    arr[cell] = sheet_data[row][cell];
                    if(arr[cell] == undefined){
                        arr[cell] = "";
                    }
                }
                listStudent.push(arr);

            }
        }

    }

});

let count = 0;

function show(){
    if(count >= 1) {
        alert("Dữ liệu đã được cập nhật");
        return;
    }
    var table = document.getElementById("table_show");
    for(let i = 0; i < listStudent.length; i ++) {
        var row = table.insertRow(i+2);
        for(let j = 0; j < listStudent[i].length; j ++) {
            var cell = row.insertCell(j);
            cell.innerHTML = listStudent[i][j];
        }
    }
    count ++;
    
    document.getElementById("table_show").style.display = 'block';
}

let x = 0;

function clickSeen(){
    
    if(x == 0) {
        document.getElementById("table_show").style.display = 'none';
        x = 1;
    } else {
        document.getElementById("table_show").style.display = 'block';
        x = 0;
    }
    
}

function clickSearch(){
    var name_search = document.getElementById("txt_search-name").value.trim();
    var id_search = document.getElementById("txt_search-id").value.trim();

    var tableSearch = document.getElementById("table_search");

    let c = 2;
    let countStudent = 0;

    if(name_search.length <= 0 && id_search.length <= 0){
        alert("Bạn phải nhập thông tin tìm kiếm");
        return;
    }

    for(let i = 0; i < listStudent.length; i ++) {
        if(listStudent[i][3] == id_search || listStudent[i][5] == name_search){
            var rowSearch = tableSearch.insertRow(c);

            for(let j = 0; j < listStudent[i].length; j ++){
                var cellSearch = rowSearch.insertCell(j);
                cellSearch.innerHTML = listStudent[i][j];
            }

            c += 1;
            countStudent += 1;
        }

    }

    if(countStudent == 0) {
        alert("Không tìm thấy học sinh phù hợp");
    } else {
        document.getElementById("table_search").style.display = 'block';
    }
}
