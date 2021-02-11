const createAutoComplete=({
    root,
    renderOption,
    onOptionSelect,
    inputValue,
    fetchData
})=>{

root.innerHTML=`
    <label><b>Search</b></>
    <input class="input"/>
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>
`;

const input=root.querySelector('input');
const dropdown=root.querySelector('.dropdown');
const resultWrapper=root.querySelector('.results');



const onInput= async event=>{
        const items= await fetchData(event.target.value);
        resultWrapper.innerHTML='';

        if(!items.length){
            dropdown.classList.remove('is-active')
            return;
        }

        dropdown.classList.add('is-active');
        for(let item of items){
            const option=document.createElement('a');
            option.classList.add('dropdown-item')
            option.innerHTML=renderOption(item);
            resultWrapper.appendChild(option);

            option.addEventListener('click',()=>{
            dropdown.classList.remove('is-active');
            input.value=inputValue(item);  
            onOptionSelect(item); 
            });


        }
}

input.addEventListener('input',bounce(onInput));

document.addEventListener('click',event=>{
    if(!root.contains(event.target)){
        dropdown.classList.remove('is-active');
    }

})

};