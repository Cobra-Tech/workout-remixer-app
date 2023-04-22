
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'fdf5a6c6bdmsh55a909a54b8df57p1e16e5jsn7d31262cbbaf',
		'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
	}
};


async function loadEx (searchInput){
let response= await fetch('https://exercisedb.p.rapidapi.com/exercises', options);
let data= await response.json();
console.log(data);
searchWorkout(searchInput, data);
}


function searchWorkout(searchInput, pex){
	// pex=loadEx();
	console.log(pex);
	let card = '';
    for (let i of pex){
		if(i.name == searchInput){
			card = `  <div class="col-sm-4 mb-3 mb-sm-0">
			<div class="card" style="width: 18rem;">
			  <img src="${i.gifUrl}" class="card-img-top" alt="...">
			   <div class="divider" style="background-color: red;"></div>
			  <div class="card-body">
				<h5 class="card-title">${i.name}</h5>
				<button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModaladd">Add</button>
				<button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">View</button> 
			  </div>
			</div>
		  </div> 
		  
		 
		  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true", style="background: transparent;">
		  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
			<div class="modal-content">
			  <div class="modal-header">
				<h1 class="modal-title fs-5" id="exampleModalLabel">Exercise details</h1>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			  </div>
			  <div class="modal-body">
				<p>This exercise is used to develop the ${i.bodyPart}</p>
				<p>This exercise targets the ${i.target} in specific</p>
				<p>The equipment needed for this exercise: ${i.equipment} in specific</p>
			  </div>
			  <div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
			  </div>
			</div>
		  </div>
		</div>


		<div class="modal fade" id="exampleModaladd" tabindex="-1" aria-labelledby="exampleModalLabeladd" aria-hidden="true", style="background: transparent;">
		<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
		  <div class="modal-content">
			<div class="modal-header">
			  <h1 class="modal-title fs-5" id="exampleModalLabeladd">Add to Workout or Add to New Workout</h1>
			  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				<div class="row">
				<form action ="/WorkoutAdd" method ="POST">
				<label for="workoutname" class="form-label">Workout Name</label>
				<div class="row">
					<div class="col-md-10">
					<input name="workoutname" type="text" class="form-control" id="workoutname" placeholder="Enter workout name">
					</div>
					<div class="col-md-2 d-flex align-items-center">
					<button type="submit" class="btn-floating btn-small waves-effect waves-light red"><i class="material-icons">add</i></button>
					</div>
				</div>
				<label for="workoutname" class="form-label">Excerise</label>
				<div class="row">
					<div class="col-md-10">
					<input name="exname" type="text" class="form-control" id="exname" placeholder="" readonly value="${i.name}">
					</div>
				</div>
				</form>
			    </div>
				<div class="divider" style="background-color:black"></div>
				<br>
				<div class="row">
				<form action="/WorkoutCreate" method="POST">
				<label for="workout" class="form-label">New Workout Name</label>
				<div class="row">
					<div class="col-md-10">
					<input name="workoutname" type="text" class="form-control" id="workname" placeholder="Enter new workout name">
					</div>
					<div class="col-md-2 d-flex align-items-center">
					<button class="btn-floating btn-small waves-effect waves-light red"><i class="material-icons">create</i></button>
					</div>
				</div>
				<label for="workoutname" class="form-label">Excerise</label>
				<div class="row">
					<div class="col-md-10">
				    <input name="exname" type="text" class="form-control" id="exname" placeholder="" readonly value="${i.name}">
					</div>
				</div>
				</form>
			    </div>
			</div>
			<div class="modal-footer">
			  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
			</div>
		  </div>
		</div>
	  </div>

		
	
		  `
		}
	}
	document.getElementById('abs').innerHTML = card;
}

// fetch('https://exercisedb.p.rapidapi.com/exercises', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));
document.addEventListener('DOMContentLoaded', function() {
document.getElementById("workoutsearch").addEventListener("submit", function(event) {
	event.preventDefault(); // prevent form submission
	var searchInput = document.getElementById("searchInput").value; 
	loadEx(searchInput);
  });
});