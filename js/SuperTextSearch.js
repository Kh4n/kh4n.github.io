// "use strict";
var pdf_complete = null;
var texts = null;
var idx = null;

window.onload = function(_) {
    document.getElementById("text_btn").addEventListener("click", gen_search_index);
    document.getElementById("search_btn").addEventListener("click", search);
    document.getElementById("pdf_file").addEventListener("change", pdf_upload);
}

function pdf_upload(e) {
    document.getElementById("search_output").innerHTML = "Loading PDF...";
    var file = e.target.files[0]
    var fileReader = new FileReader();  

	fileReader.onload = function() {
        var typedarray = new Uint8Array(this.result);
        
        var promises = []
		pdfjsLib.getDocument(typedarray).then(function(pdf) {
			// you can now use *pdf* here
            console.log("the pdf has ",pdf.numPages, "page(s).")
            for (var i = 1; i <= pdf.numPages; ++i) {
                promises.push(pdf.getPage(i).then(function(page) {
                    return page.getTextContent().then(function(text) {
                        return text.items.map(e => e.str.trim()).join(' ');
                    });
                }));
            }
            Promise.all(promises).then(function(ts) {
                pdf_complete = ts.join(' ').replace(/\- /g,"");
                gen_search_index();
            });
		});
	};
    fileReader.readAsArrayBuffer(file);
}

function gen_search_index() {
    if (!pdf_complete) {
        alert("You must upload a PDF first")
        return;
    }
    setTimeout(_gen_search_index, 1);
    document.getElementById("search_output").innerHTML = "Loading search index...";
}

function _gen_search_index() {
    texts = []
    var length = parseInt(document.getElementById("length").value);
    // var offset = parseInt(document.getElementById("offset").value);
    for (var i = 0; i < length; i += length/2) {
        texts.extend(splitSlice(pdf_complete, length, i));
    }
    idx = genIdx(texts);
    document.getElementById("search_output").innerHTML = "Done loading search index...use the search button to search";
}

function search() {
    if (!(texts && idx)) {
        document.getElementById("search_output").innerHTML = "You must upload a PDF first";
        return;
    }
    document.getElementById("search_output").innerHTML = advSearch(texts, idx, document.getElementById("search_input").value)
}

// splits string into either n chunks with length len
function splitSlice(str, len, offset) {
    var ret = [];
    for (var cur = offset, strLen = str.length; cur < strLen; cur += len) {
        ret.push(str.slice(cur, len + cur));
    }
    return ret;
}

// generates a search index using Lunr.js. assumes input is an array of texts that it then puts into a format Lunr recognizes
function genIdx(texts) {
    var documents = [];
    texts.forEach(function(e, i) {
        documents.push({"id": i, "text": e});
    });
    var idx = lunr(function () {
        this.ref("id");
        this.field("text");
    
        documents.forEach(function (doc) {
        this.add(doc)
        }, this);
    });
    return idx;
}

function highlight(terms, text) {
    return text.split(/[ \n]/).map(function(w) {
        if (terms.includes(w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").toLowerCase())) {
            return "<mark>"+w+"</mark>"
        }
        return w
    }).join(' ')
}

// takes a search text and a question, returns a 2000 (default) character most relevant section of the text.
// length value is length of return chunk. 2000 seems good. too short and you get sentences that contain synonyms
// but don't reflect value of question. too long and you risk getting sections that are not relevant at all
// optional offset value lets you offset the return length so you can avoid splitting the most relevent string in the text.
function advSearch(texts, idx, question) {
    var words = [
        'about', 'above', 'after', 'again', 'all', 'also', 'am', 'an', 'and', 'another',
        'any', 'are', 'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below',
        'between', 'both', 'but', 'by', 'came', 'can', 'cannot', 'come', 'could', 'did',
        'do', 'does', 'doing', 'during', 'each', 'few', 'for', 'from', 'further', 'get',
        'got', 'has', 'had', 'he', 'have', 'her', 'here', 'him', 'himself', 'his', 'how',
        'if', 'in', 'into', 'is', 'it', 'its', 'itself', 'like', 'make', 'many', 'me',
        'might', 'more', 'most', 'much', 'must', 'my', 'myself', 'never', 'now', 'of', 'on',
        'only', 'or', 'other', 'our', 'ours', 'ourselves', 'out', 'over', 'own',
        'said', 'same', 'see', 'should', 'since', 'so', 'some', 'still', 'such', 'take', 'than',
        'that', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', 'these', 'they',
        'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was',
        'way', 'we', 'well', 'were', 'what', 'where', 'when', 'which', 'while', 'who',
        'whom', 'with', 'would', 'why', 'you', 'your', 'yours', 'yourself',
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
        'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '$', '1',
        '2', '3', '4', '5', '6', '7', '8', '9', '0', '_'
    ];
    question = question.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    question = question.split(" ").map(e => e.toLowerCase()).filter(e => !words.includes(e));
    // the final string that contains the most relevant words
    var relevenceString = question.join(' ')
    console.log(`Keyword string: ${relevenceString}\n`);
    return highlight(question, texts[idx.search(relevenceString)[0].ref]) + "<br><br><br>" + 
            highlight(question, texts[idx.search(relevenceString)[1].ref]) + "<br><br><br>" + 
            highlight(question, texts[idx.search(relevenceString)[2].ref]);
}

Array.prototype.extend = function (other_array) {
    /* You should include a test to check whether other_array really is an array */
    other_array.forEach(function(v) {this.push(v)}, this);
}