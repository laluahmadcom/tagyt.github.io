const urlField = document.querySelector('.field input');
const ul = document.querySelector('.url-field ul');
const tagNum = document.querySelector('.details span');



urlField.onkeyup = ()=>{
    let vidId = urlField.value;
    if (vidId.indexOf('https://www.youtube.com/watch?v=') != -1) {
        let Id = vidId.split('v=')[1].substring(0, 11);
        // console.log(Id);
        getTags(Id);
    }else if (vidId.indexOf('https://youtu.be/') != -1) {
        let Id = vidId.split('be/')[1].substring(0, 11);
        // console.log(Id);
        getTags(Id);
    }
 
}

function getTags(Id) {
    // Please Use your on api key
    let key = "AIzaSyD3NXPLGOHw_MIBiEL6-Xc0LYTSsb_thQo";
    // let key = ["Your Api key"];
    fetch(`https://www.googleapis.com/youtube/v3/videos?id=${Id}&key=${key}&part=snippet`)
    .then((res)=> res.json())
    .then((data)=>{
        // console.log(data);
        let tags = data.items[0].snippet.tags;
        if (tags === undefined) {
            ul.innerHTML = `No tags are found`;
            tagNum.innerHTML = '0';
        }else{
            let hidden = document.querySelector('.wrapper .hidden');
            hidden.value = tags.toString();
            createTags();
            countTags()
    
        }
        
        function countTags() {
            tagNum.innerHTML = tags.length;
        }

        function createTags() {
            ul.querySelectorAll('li').forEach(li => li.remove())
            tags.slice().reverse().forEach(tag =>{
                let liTags = `${tag}`;
                ul.insertAdjacentHTML('afterbegin', liTags)
            })
            
        }

    }).catch((error) => {
        console.log(error);
    })
}

const copyBtn = document.querySelector('.details button');
copyBtn.addEventListener('click',()=>{
    let hidden = document.querySelector('.wrapper .hidden');
    hidden.select();
    hidden.setSelectionRange(0, 999999);
    navigator.clipboard.writeText(hidden.value);
    alert('Tags are copied')
})
