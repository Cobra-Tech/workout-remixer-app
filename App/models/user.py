from werkzeug.security import check_password_hash, generate_password_hash
from flask_login import UserMixin
from App.database import db
from flask_sqlalchemy import SQLAlchemy
import random


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username =  db.Column(db.String, nullable=False, unique=True)
    password = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    workouts = db.relationship('Workout', backref='user', lazy=True, cascade="all, delete-orphan")

    def __init__(self, username, password, email):
        self.username = username
        self.set_password(password)
        self.email = email

    def get_json(self):
        return{
            'id': self.id,
            'username': self.username,
            'workouts':self.workouts
        }

    def set_password(self, password):
        """Create hashed password."""
        self.password = generate_password_hash(password, method='sha256')
    
    def check_password(self, password):
        """Check hashed password."""
        return check_password_hash(self.password, password)

    def createWorkoutsug(self,ex1,ex2,ex3,ex4,ex5):
        sugwork = Workout("Workout " + str(random.randint(1, 200)))
        sugwork.user_id = self.id
        db.session.add(sugwork)
        db.session.commit()
        print(sugwork.id)
        print(sugwork.name)
        ex1.workout_id = sugwork.id
        ex2.workout_id = sugwork.id
        ex3.workout_id = sugwork.id
        ex4.workout_id = sugwork.id
        ex5.workout_id = sugwork.id
        db.session.add(ex1)
        db.session.add(ex2)
        db.session.add(ex3)
        db.session.add(ex4)
        db.session.add(ex5)
        db.session.add(sugwork)
        db.session.commit()
    
    def removeWorkout(self, workout_id):
      workout = Workout.query.get(workout_id)
      db.session.delete(workout)
      db.session.commit()
      return True

    def removeEx(self, ex_id):
      ex = Exercise.query.get(ex_id)
      db.session.delete(ex)
      db.session.commit()
      return True

    def addEx(self, workoutname, exname):
      work = Workout.query.filter_by(name=workoutname,user_id=self.id).first()
      ex = Exercise(exname,random.randint(1, 4),random.randint(1, 15))
      ex.workout_id = work.id
      db.session.add(ex)
      db.session.commit()
      return True

    def createWork(self, workoutname, exname):
      work = Workout(workoutname)
      work.user_id = self.id
      db.session.add(work)
      db.session.commit()
      ex = Exercise(exname,random.randint(1, 4),random.randint(1, 15))
      ex.workout_id = work.id
      db.session.add(ex)
      db.session.commit()
      return True

class Workout(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String, nullable=False, unique=True)
    exercises = db.relationship('Exercise', backref='workout',  lazy=True, cascade="all, delete-orphan" )
    
    def __init__(self, name):
      self.name = name

    def __repr__(self):
      return f'<Workout {self.id}: {self.name} - {self.exercises}>'  

class Exercise(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True) 
    workout_id = db.Column(db.Integer, db.ForeignKey('workout.id'), nullable=False, default=0)  
    name =  db.Column(db.String, nullable=False, unique=False)
    sets =  db.Column(db.Integer, nullable=False)
    reps =  db.Column(db.Integer, nullable=False)

    # def __init__(self, name):
    #   self.name = name
    #   self.sets = random.randint(1, 4)
    #   self.reps = random.randint(1, 15)

    def __init__(self, name, sets, rep):
      self.name = name
      self.sets = sets
      self.reps = rep


    def __repr__(self):
      return f'Exercise {self.name}' 