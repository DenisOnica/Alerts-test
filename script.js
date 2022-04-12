const select = document.querySelector('#select')
const name = document.querySelector('#name')
const age = document.querySelector('#age')
const addSourceBtn = document.querySelector('#addsource')
const sourceName = document.querySelector('#sourcename')
const sourceCareer = document.querySelector('#sourcecareer')
const validateBtn = document.querySelector('#validate')
const counterCareer = document.querySelector('#career')
const generateBtn = document.querySelector('#generate')
const container = document.querySelector('#main')
const source1 = document.querySelector('#source1')
const source2 = document.querySelector('#source2')
const copyBtn = document.querySelector('#copy')
const clipboard = document.querySelector('#clipboard')
let option = ''

const messages = []

let cname, cage, ccareer
let CPmessage

select.addEventListener('change', () => {
    option = select.value
})

addSourceBtn.addEventListener('click', () => {
    
    let Sname = sourceName.value
    let Scareer = sourceCareer.value
    let message

    if(option == 'dob'){
        message = ` has a different DOB than the CP, meaning the two persons are different. Therefore, this is a false positive.`
        messages.push(message)
    }
    if(option == 'career'){
        message = `is ${Sname}, ${Scareer}. Due to the fact that the CP works for ${counterCareer.value} (see attachment), we can safely assume that the two of them are not the same person. Therefore we close the alert as false positive.`
        messages.push(message)
    }
    sourceName.value = ''
    sourceCareer.value = ''
    select.value = ''
})

validateBtn.addEventListener('click', () => {
    cname = name.value
    cage = age.value
    CPmessage = (cage != '') ? `Our counterparty is ${cname}
    born on ${cage}.` : `Our counterparty is ${cname}`
    source1.innerHTML = ''
    source2.innerHTML = ''
})

generateBtn.addEventListener('click', () => {
    Output1(CPmessage)
    clipboard.value = CPmessage + '\n'

    messages.forEach( (message, index) => {
        let prefix = (messages.length > 1) ? `Source ${index + 1} ` : 'The source ';
        Output(prefix + message, index + 1)
        let test = prefix + message + '\n'
        clipboard.value += test
    })
    messages.splice(0, messages.length)
    name.value = ''
    age.value = ''
    counterCareer.value = ''
    
})


function Output(message, index){
    const output = document.createElement('div');
    const p = document.createElement('p')
    p.textContent = message;
    output.appendChild(p)
    const main = document.querySelector(`#source${index}`);
    main.textContent = "";
    main.appendChild(output);
}

function Output1(message){
    const p = document.createElement('p')
    p.textContent = message;
    const counter = document.querySelector("#counterparty");
    counter.textContent = "";
    counter.appendChild(p);
}

copyBtn.addEventListener('click', () => {
   clipboard.select()
   clipboard.setSelectionRange(0, 99999)
   navigator.clipboard.writeText(clipboard.value)
})