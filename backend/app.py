from flask import Flask
from flask_restful import Api, Resource

app = Flask(__name__)
api = Api(app)

class CountyAPI(Resource):
    def get(self, county_name):
        
        if county_name.lower() == "seminole":
            return {
                "name": "Seminole",
                "population": 500000,
                "median_income": 50000,
                "unemployment_rate": 0.05
            }
        elif county_name.lower() == "orange":
            return {
                "name": "Orange",
                "population": 1000000,
                "median_income": 60000,
                "unemployment_rate": 0.06
            }
        else:
            return {
                "error": "County not found"
            }

api.add_resource(CountyAPI, '/county/<string:county_name>')

if __name__ == '__main__':
    app.run(debug=True)
