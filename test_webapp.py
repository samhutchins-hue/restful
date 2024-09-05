import unittest
from webapp import app, db, Item


class FlaskWebAppTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
        cls.app = app.test_client()
        cls.app_context = app.app_context()
        cls.app_context.push()
        db.create_all()

    @classmethod
    def tearDownClass(cls):
        db.session.remove()
        db.drop_all()
        cls.app_context.pop()

    def test_add_item(self):
        response = self.app.post('/items', json={'name': 'Test Item'})
        self.assertEqual(response.status_code, 201)
        self.assertIn('Test Item', response.json['name'])

    def test_get_items(self):
        self.app.post('/items', json={'name': 'Another Item'})
        response = self.app.get('/items')
        self.assertEqual(response.status_code, 200)
        self.assertGreater(len(response.json), 0)


if __name__ == '__main__':
    unittest.main()
