from flask import Blueprint, render_template, jsonify, request, send_from_directory, flash, redirect, url_for
from flask_jwt_extended import jwt_required, current_user as jwt_current_user
from flask_login import login_required, login_user, current_user, logout_user
from App.models.user import User, Workout, Exercise, db

from.index import index_views

from App.controllers import (
    create_user,
    jwt_authenticate,
    login 
)

auth_views = Blueprint('auth_views', __name__, template_folder='../templates')

'''
Page/Action Routes

'''

@auth_views.route('/login', methods=['GET'])
def login_page():
    return render_template('login.html')

@auth_views.route('/signup', methods=['GET'])
def signup_page():
    return render_template('signup.html')

@auth_views.route('/myworkout', methods=['GET'])
def myworkout_page():
    workout = current_user.workouts
    return render_template('index.html',workout=workout)

@auth_views.route('/suggestion', methods=['GET'])
def suggestion_page():
    return render_template('suggestionjin.html')


@auth_views.route('/users', methods=['GET'])
def get_user_page():
    users = get_all_users()
    return render_template('users.html', users=users)


@auth_views.route('/identify', methods=['GET'])
@login_required
def identify_page():
    return jsonify({'message': f"username: {current_user.username}, id : {current_user.id}"})


@auth_views.route('/login', methods=['POST'])
def login_action():
    data = request.form
    user = login(data['username'], data['password'])
    if user:
        login_user(user)
        return redirect(url_for('auth_views.myworkout_page'))
    return 'bad username or password given', 401

@auth_views.route('/signup', methods=['POST'])
def addUser():
  info = request.form
  check = User.query.filter_by(username=info['username']).first()
  if check:
    flash('Username Taken','error')
    return redirect(url_for('auth_views.signup_page'))
  user = User(info['username'],  info['password'], info['email'],)
  db.session.add(user)
  db.session.commit()
  return redirect(url_for('auth_views.login_page'))


@auth_views.route('/logout', methods=['GET'])
def logout_action():
    data = request.form
    user = login(data['username'], data['password'])
    return 'logged out!'

'''
API Routes
'''

@auth_views.route('/api/users', methods=['GET'])
def get_users_action():
    users = get_all_users_json()
    return jsonify(users)

@auth_views.route('/api/users', methods=['POST'])
def create_user_endpoint():
    data = request.json
    create_user(data['username'], data['password'])
    return jsonify({'message': f"user {data['username']} created"})

@auth_views.route('/api/login', methods=['POST'])
def user_login_api():
  data = request.json
  token = jwt_authenticate(data['username'], data['password'])
  if not token:
    return jsonify(message='bad username or password given'), 401
  return jsonify(access_token=token)

@auth_views.route('/api/identify', methods=['GET'])
@jwt_required()
def identify_user_action():
    return jsonify({'message': f"username: {jwt_current_user.username}, id : {jwt_current_user.id}"})

@auth_views.route('/sendeet', methods=['POST'])
def user_wk_add():
    info = request.form
    ex1 = Exercise(info[f'ex1name{info["val"]}'], info[f'ex1sets{info["val"]}'], info[f'ex1reps{info["val"]}'])
    ex2 = Exercise(info[f'ex2name{info["val"]}'], info[f'ex2sets{info["val"]}'], info[f'ex2reps{info["val"]}'])
    ex3 = Exercise(info[f'ex3name{info["val"]}'], info[f'ex3sets{info["val"]}'], info[f'ex3reps{info["val"]}'])
    ex4 = Exercise(info[f'ex4name{info["val"]}'], info[f'ex4sets{info["val"]}'], info[f'ex4reps{info["val"]}'])
    ex5 = Exercise(info[f'ex5name{info["val"]}'], info[f'ex5sets{info["val"]}'], info[f'ex5reps{info["val"]}'])
    current_user.createWorkoutsug(ex1,ex2,ex3,ex4,ex5)
    print(current_user.get_json())
    # print(info)
    return render_template('suggestionjin.html')

@auth_views.route('/WorkoutRemove/<int:workout_id>', methods=['POST'])
def removeMyWorkout(workout_id):
    current_user.removeWorkout(workout_id)
    return redirect(url_for('auth_views.myworkout_page'))
    
   
@auth_views.route('/ExerciseRemove/<int:ex_id>', methods=['POST'])
def removeMyEx(ex_id):
    current_user.removeEx(ex_id)
    return redirect(url_for('auth_views.myworkout_page'))  

@auth_views.route('/WorkoutAdd', methods=['POST'])
def addMyEx():
    info = request.form
    workoutname = info['workoutname']
    exname = info['exname']
    current_user.addEx(workoutname, exname)
    return redirect(url_for('auth_views.myworkout_page'))  

@auth_views.route('/WorkoutCreate', methods=['POST'])
def CreateMyWork():
    info = request.form
    workoutname = info['workoutname']
    exname = info['exname']
    current_user.createWork(workoutname, exname)
    return redirect(url_for('auth_views.myworkout_page'))  