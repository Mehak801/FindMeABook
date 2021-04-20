function bookSearch() {
    var searchData = document.getElementById('books').value;
    var maxresult = document.getElementById('maxResult').value;
    document.getElementById('results').innerHTML = "";
    var title = '', author = '', publisher = '', img = '', info = '';

    if (searchData == "" || searchData == null) {
        alert('Enter a book title or author name');
    }
    $.ajax({
        url: "https://www.googleapis.com/books/v1/volumes?q=" + searchData + "&maxResults=" + maxresult,
        dataType: "json",

        success: function (data) {
            var result_box = $('<ul id="result-box">' + '</ul>');
            result_box.appendTo("#results");
            for (var i = 0; i < data.items.length; i++) {

                title = data.items[i].volumeInfo.title;
                author = data.items[i].volumeInfo.authors;
                publisher = data.items[i].volumeInfo.publisher;
                img = data.items[i].volumeInfo.imageLinks.thumbnail;
                info = data.items[i].volumeInfo.infoLink;

                document.getElementById('result-box').innerHTML += '<li>' + formatOutput(title, author, publisher, img, info) + '</li>';
            }
        },
        type: 'GET'
    });
}

document.getElementById('mybutton').addEventListener('click', bookSearch, false);

function formatOutput(title, author, publisher, img, info) {
    var HTMLcard = `<div class="book-container">
                        <div class="book-img" style = "background-image: url(${img});">
                            <img src = "${img}" alt = "...">
                        </div>
                        <div class="book-content">
                            <h3>${title}</h3>
                            <p><strong>Author:</strong> ${author}</p>
                            <p><strong>Publisher:</strong> ${publisher}</p>
                        </div>
                        <a href="${info}"><button class="btn">Read More</button></a>
                    </div>`

    return HTMLcard;
}

function ajax_req(searchIt, idx){
    $.ajax({
        url: "https://www.googleapis.com/books/v1/volumes?q=" + searchIt + "&maxResults=1",
        dataType: "json",

        success: function (data) {
            if(data.items.length>0){
                var title = '', author = '', publisher = '', img = '', info = '';
                var book = data.items[0];
                title = book.volumeInfo.title;
                author = book.volumeInfo.authors;
                publisher = book.volumeInfo.publisher;
                img = book.volumeInfo.imageLinks.thumbnail;
                info = book.volumeInfo.infoLink;
                
                document.getElementById('featured-box').innerHTML += '<div class="books-box">'+formatOutput(title, author, publisher, img, info)+'</div>';
            }
        },
        type: 'GET'
    });
}

function carousel_fun(){
    var recommended = ["Pride and Prejudice", "To Kill A Mockingbird", "The Lion, the Witch and the Wardrobe"];    

    for(var i=0; i<recommended.length; i++){
        ajax_req(recommended[i],i+1);
    }
}

