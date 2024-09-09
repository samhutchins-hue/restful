from flask import Blueprint, jsonify, request

from .extensions import db
from .models import Item

main = Blueprint('main', __name__)


@main.route('/items', methods=['GET'])
def get_items():
    items = Item.query.all()
    return jsonify([{'id': item.id, 'name': item.name} for item in items]), 200


@main.route('/test', methods=['GET'])
def get_test():
    return jsonify({
            'message': 'This is a test endpoint',
            'status': 'success'}), 200


@main.route('/items/<int:item_id>', methods=['GET'])
def get_item(item_id):
    item = db.session.get(Item, item_id)
    if item:
        return jsonify({'id': item.id, 'name': item.name}), 200
    else:
        return jsonify({'message': 'Item not found'}), 404


@main.route('/items', methods=['POST'])
def add_item():
    data = request.json
    new_item = Item(name=data['name'])
    db.session.add(new_item)
    db.session.commit()
    return jsonify({'id': new_item.id, 'name': new_item.name}), 201


@main.route('/items/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    item = db.session.get(Item, item_id)
    if item:
        db.session.delete(item)
        db.session.commit()
        return jsonify({'message': 'Item deleted'}), 200
    else:
        return jsonify({'message': 'Item not found'}), 404
