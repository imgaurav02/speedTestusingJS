const btn = document.querySelector("button")
const file_size = 5245329 * 8
const i = 100


const progress = document.querySelector('.progress')
const speed_text = document.querySelector('.speed_text')

let test_results = []

const loadImage = () =>{
    return new Promise((resolve,reject) =>{
        let img = new Image();
        img.src = "./gaurav.jpg?" + parseInt(Math.random() * 10000)
        let startTime = Date.now()
        img.onload = () =>{
            let endTime = Date.now()
            resolve(endTime - startTime)
        }
        img.onerror = (err) =>{
            reject(err);
        }
    })
}
async function getLoadSpeed(){
    let loadTime = await loadImage()
    if(loadTime < 1) loadTime = 1
    let speed_bps = file_size / loadTime
    let speed_kbps = speed_bps / 1024
    return speed_kbps
}

const getAvg = () => {
    let sum = test_results.reduce((a,b) => a+b,0)
    return sum / test_results.length
}

btn.addEventListener('click', async () =>{
    for(let j =  0;j<i;j++){
        let speed = await getLoadSpeed()
        test_results.push(speed)
        speed_text.innerHTML = getAvg().toFixed(2) + ' kbps'
        progress.style.width = ((j+1) / i * 100) + '%'
    }
})