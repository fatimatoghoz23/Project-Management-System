let title=document.getElementById('title')
let price=document.getElementById('price')
let discount=document.getElementById('discount')
let total=document.getElementById('total')
let total2=document.getElementById('total2')

let count=document.getElementById('count')
let category=document.getElementById('category')
let submit=document.getElementById('submit')
let mood='create'
let tmp


function getTotal(){
  if(price.value != ''){
    let result= +price.value - +discount.value;
    total.innerHTML=result;
    total.style.background='#040'
  }else{
    total.innerHTML='';
    total.style.background='#a00d02'
  }

}
function getTotal2(){
  if(price.value != ''){

    let result1= (+price.value - +discount.value) * +count.value;
    total2.innerHTML=result1;
    total2.style.background='#040'
  }else{
    total2.innerHTML='';
    total2.style.background='#a00d02'
  }

}
let data
if(localStorage.product != null){
  data=JSON.parse(localStorage.product)
}else{
  data=[]
}
submit.onclick =function(){
  
  let newproduct={
    title:title.value.toLowerCase(),
    price:price.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value.toLowerCase()

  }
  if(mood ==='create'){
  if(newproduct.count>1){
  for(let i=0;i<newproduct.count;i++){
    data.push(newproduct)

  }
  }else{
    data.push(newproduct)

  }
}else{
  data[tmp]=newproduct
  mood='create'
  submit.innerHTML='Create'
  count.style.display='block'
}
  localStorage.setItem('product', JSON.stringify(data))
  cleardata()
  showdata()
}

function cleardata(){
  title.value='';
  price.value='';
  discount.value='';
  total.innerHTML='';
  count.value='';
  category.value='';
}

function showdata(){
  getTotal()
  let table = '';
  for(let i = 0 ;i<data.length;i++){
    table += `
    <tr>
    <td>${i}</td>
    <td>${data[i].title}</td>
    <td>${data[i].price}</td>
    <td>${data[i].discount}</td>
    <td>${data[i].total}</td>
    <td>${data[i].category}</td>
    <td><button id="update" onclick="updateData(${i})">Update</button></td>
    <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>

    </tr>
    ` 
   
   
    
  }
  document.getElementById('tbody').innerHTML=table
  let btnDelete = document.getElementById('deleteAll')
  if(data.length>0){
    btnDelete.innerHTML=`
    <button id="deleteAll" onclick="deleteAll()">Delete All(${data.length})</button>
    `
  }else{
    btnDelete.innerHTML=''
  }

 
}
showdata()


function deleteData(i){
  data.splice(i,1)
  localStorage.product = JSON.stringify(data)
  showdata()
}
function deleteAll(){
  localStorage.clear()
  data.splice(0)
  showdata()

}


function updateData(i){
  title.value=data[i].title;
  price.value=data[i].price
  discount.value=data[i].discount
  getTotal()
  count.style.display='none'
  category.value=data[i].category
  submit.innerHTML='update'
  mood='update'
  tmp=i
  scroll({
    top:0,
    behavior:'smooth'
  })
}


let searchMood= 'title';
function getSearchMood(id){
  let search=document.getElementById('search')
  if(id == 'searchTitle'){
    searchMood= 'title';
  }else{
    searchMood= 'category';

  }
  search.placeholder='Search By '+searchMood

  search.focus()
  search.value=''
  showdata()
}

function searchData(value){
  let sum=0
  let table=''
  
if(searchMood == 'title'){
  for(let i=0;i<data.length;i++){
    if(data[i].title.includes(value.toLowerCase())){
      table += `
      <tr>
      <td>${i}</td>
      <td>${data[i].title}</td>
      <td>${data[i].price}</td>
      <td>${data[i].discount}</td>
      <td>${data[i].total}</td>
      <td>${data[i].category}</td>
      <td><button id="update" onclick="updateData(${i})">Update</button></td>
      <td><button onclick="deleteData(${i})"  id="delete">Delete</button></td>

  
      </tr>
      ` 
      let btncount = document.getElementById('countp')
      if(data.length>0){
        btncount.innerHTML=`
        <button id="deleteAll" onclick="  showdata()
        ">الشراء:  (${data[i].count}) |المتبقي :(${data.filter(s => s.title === data[i].title ).length })</button>
        `
      }else{
        btnDelete.innerHTML=''
      }
    }

  }
 
}else{
  for(let i=0;i<data.length;i++){
    if(data[i].category.includes(value)){
      table += `
      <tr>
      <td>${i}</td>
      <td>${data[i].title}</td>
      <td>${data[i].price}</td>
      <td>${data[i].discount}</td>
      <td>${data[i].total}</td>
      <td>${data[i].category}</td>
      <td><button id="update" onclick="updateData(${i})">Update</button></td>
      <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
  
      </tr>
      ` 
    }
    
  }
}
document.getElementById('tbody').innerHTML=table

}
