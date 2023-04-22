from flask import Blueprint, redirect, render_template, request, send_from_directory, jsonify
from App.models import db
from App.controllers import create_user

index_views = Blueprint('index_views', __name__, template_folder='../templates')

@index_views.route('/', methods=['GET'])
def index_page():
    return render_template('login.html')

@index_views.route('/init', methods=['GET'])
def init():
    try:
        db.drop_all()
        db.create_all()
        create_user('bob', 'bobpass', 'bob@mail.com')
        return jsonify(message='db initialized!')
    except Exception as e:
        return jsonify({'success': False, 'message': f'Error initializing application: {str(e)}'})

@index_views.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status':'healthy'})