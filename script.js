$(document).ready(function() {


    $('#submit').click(function() {

        event.preventDefault();
    
        

    
        var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        queryURL += "?" + $.param({
            'api-key' : "92dd6f55408f4977907680bcd71cdcad",
            'q' : keywordValue,
            // 'q' : startingYearValue,
            // 'q' : endingYearValue
        });
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function(result) {
            console.log(result);
    
            // DISPLAY QUANTITY OF ARTICLES DEPENDENT ON #article-amount VALUE
            for (var i = 0; i < articleAmount; i++) {

                // articleItem HOLDS ONE ARTICLE INCLUDING A HEADLINE, AUTHOR, PUB DATE AND URL
                var articleItem = $('<div id="article-item">');
    
                var articleHeadline = result.response.docs[i].headline.main;
                var headlineDiv = $('<h3 id="headline">');
                headlineDiv.css('font-weight', 'bold');
                headlineDiv.html(articleHeadline);
                articleItem.html(headlineDiv);
    
                var articleAuthor = result.response.docs[i].byline.original;
                var authorDiv = $('<p id="author">');
                authorDiv.html(articleAuthor);
                articleItem.append(authorDiv);
    
                var articleDate = result.response.docs[i].pub_date;
                console.log(articleDate);
                var dateDiv = $('<p id="date">');
                dateDiv.html(articleDate);
                articleItem.append(dateDiv);
    
                var articleURL = result.response.docs[i].web_url;
                var urlDiv = $('<a id="article-url" href="' + articleURL + '" target="_blank">');
                urlDiv.html(articleURL);
                articleItem.append(urlDiv);
    
                $('#article-display').css( 
                    {
                        'border': '1px solid rgb(42, 47, 102)',
                        'border-radius': '5px'
                    }
                );
                $('#article-div').append(articleItem);
    
            }
    
            
        })
    
    })
    
    $('#clear').click(function() {
        $('#keywords').empty();
        $('#article-amount').empty();
    })



})

