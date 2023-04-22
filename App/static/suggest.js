const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'fdf5a6c6bdmsh55a909a54b8df57p1e16e5jsn7d31262cbbaf',
		'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
	}
};


async function genSuggest (){
    let response= await fetch('https://exercisedb.p.rapidapi.com/exercises', options);
    let data= await response.json();
    console.log(data);
    buildSuggest(data);
}


let t = 0;


function buildSuggest(data){
  console.log(data);
  let card = '';
  let modal ='';
  
  for (var i = 0; i < 3; i++) {
    //console.log("hello")
    let imgSrc = '';
    if (i == 0) {
      imgSrc = 'https://img.freepik.com/free-photo/athletic-man-woman-with-dumbbells_155003-11801.jpg?w=1060&t=st=1680982700~exp=1680983300~hmac=24909fb5409da878c173664f9a0fb11ac48a372ccef8af30c3550a56952d41aa';
    } else if (i == 1) {
      imgSrc = 'https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?cs=srgb&dl=pexels-anush-gorak-1229356.jpg&fm=jpg';
    } else if (i == 2) {
      imgSrc = 'https://media.istockphoto.com/id/615883260/photo/difficult-doesnt-mean-impossible.jpg?s=612x612&w=0&k=20&c=cAEJvjTFRuF9H9gRov1Aj4X4I6xV6DSvMwWsf-2IW-0=';
    }
    var nums = [];
    var reps = [];
    var sets = [];
    for (var x = 0; x < 5; x++) {
      nums.push(Math.floor(Math.random() * 1325));
      reps.push(Math.floor(Math.random() * 16) + 1);
      sets.push(Math.floor(Math.random() * 6)+ 1);
      //  console.log(nums[x]);
    }
    t = t+1;
      card+=`<div class="col-sm-4 mb-3 mb-sm-0">
      <div class="card" style="width: 18rem;">
      <img src="${imgSrc}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Workout ${t}</h5>
          <p class="card-text">This workout is randomly generated for you</p>
          <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal${i}">View</button>       
        </div>
      </div>
    </div>`
    
    modal+=`
    <div class="modal fade" id="exampleModal${i}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true", style="background: transparent;">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Workout details</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Excercise: ${data[nums[0]].name} Sets: ${sets[0]} Reps: ${reps[0]}</p>
            <p>Excercise: ${data[nums[1]].name} Sets: ${sets[1]} Reps: ${reps[1]}</p>
            <p>Excercise: ${data[nums[2]].name} Sets: ${sets[2]} Reps: ${reps[2]}</p>
            <p>Excercise: ${data[nums[3]].name} Sets: ${sets[3]} Reps: ${reps[3]}</p>
            <p>Excercise: ${data[nums[4]].name} Sets: ${sets[4]} Reps: ${reps[4]}</p>
          </div>
          <div class="modal-footer">
              <form action="/sendeet" method="POST">              
              <div class="mb-3">           
              <button class="red btn waves-effect waves-light" type="submit">Add</button>         
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
              <input name="val" type="text" class="form-control" id="val" value="${i}" >
              <input name="ex1name${i}" type="text" class="form-control" id="ex1name${i}" value="${data[nums[0]].name}" >
              <input name="ex1sets${i}" type="text" class="form-control" id="ex1sets${i}" value="${sets[0]}" >   
              <input name ="ex1reps${i}" type="text" class="form-control" id="ex1reps${i}", value="${reps[0]}">
              <input name="ex2name${i}" type="text" class="form-control" id="ex2name${i}" value="${data[nums[1]].name}" >
              <input name="ex2sets${i}" type="text" class="form-control" id="ex2sets${i}" value="${sets[1]}" >   
              <input name ="ex2reps${i}" type="text" class="form-control" id="ex2reps${i}", value="${reps[1]}">
              <input name="ex3name${i}" type="text" class="form-control" id="ex3name${i}" value="${data[nums[2]].name}" >
              <input name="ex3sets${i}" type="text" class="form-control" id="ex3sets${i}" value="${sets[2]}" >   
              <input name ="ex3reps${i}" type="text" class="form-control" id="ex3reps${i}", value="${reps[2]}">
              <input name="ex4name${i}" type="text" class="form-control" id="ex4name${i}" value="${data[nums[3]].name}" >
              <input name="ex4sets${i}" type="text" class="form-control" id="ex4sets${i}" value="${sets[3]}" >   
              <input name ="ex4reps${i}" type="text" class="form-control" id="ex4reps${i}", value="${reps[3]}">
              <input name="ex5name${i}" type="text" class="form-control" id="ex5name${i}" value="${data[nums[4]].name}" >
              <input name="ex5sets${i}" type="text" class="form-control" id="ex5sets${i}" value="${sets[4]}" >   
              <input name ="ex5reps${i}" type="text" class="form-control" id="ex5reps${i}", value="${reps[4]}">

            </form>   
            

          </div>
        </div>
      </div>
    </div>
    `
  }
  document.getElementById('abs').innerHTML = card;
  document.getElementById('abs1').innerHTML = modal;
}






document.addEventListener('DOMContentLoaded', function() {
  genSuggest ();
  document.getElementById("generate").addEventListener("click", function(event) {
    genSuggest();
  });
  });