let colorArray = [
    {hex:"#7C0909", id:0}, 
    {hex:"#AD0C0C", id:1}, 
    {hex:"#DE0E0E", id:2}, 
    {hex:"#F32B2B", id:3}, 
    {hex:"#F55A5A", id:4}
    ]

/*function will render the HTML section for the 5 color boxes & 5 color hex numbers below the boxes*/
function renderColors(){
    let boxes = ''
    let hexes = ''
    colorArray.forEach(color => {
        boxes += `
            <div class="color-box" style="background-color:${color.hex};"></div>
        ` 
        
        hexes += `
            <div class="color-hex" id=${color.id} >${color.hex}</div>
        `
    })
    
    document.getElementById('color-boxes').innerHTML = boxes
    document.getElementById('color-hexes').innerHTML = hexes
}
renderColors()

/*Clears the current colorArray, gets the new values selected for color and mode by user, creates a new API address with users choices and runs the fetchColors function*/
document.getElementById('color-button').addEventListener('click', function(e){
    e.preventDefault()
    colorArray=[]
    const modeChoice = document.getElementById('mode-choice').value
    const colorChoice = document.getElementById('color-choice').value
    let apiAddress = `
        https://www.thecolorapi.com/scheme?hex=${colorChoice.slice(1,7)}&mode=${modeChoice}&count=5
        `
    fetchColors(apiAddress)
})

/*function to GET color scheme from the color API site, push it to the cleared colorArray and then run the renderColors function*/
function fetchColors(apiAdd){
    fetch(apiAdd)
        .then(res => res.json())
        .then(data =>  {
            let colorArr = data.colors
            for (let i=0; i<colorArr.length; i++){
                colorArray.push({hex:colorArr[i].hex.value, id:i})
        }
        renderColors()
    })
}

/*Copies the Hex number to the clipboard when clicked*/
document.getElementById('color-hexes').addEventListener('click', (e)=>{
    colorArray.forEach(color =>{
        if(color.id == e.target.id){
            navigator.clipboard.writeText(color.hex)
        }
    })
})