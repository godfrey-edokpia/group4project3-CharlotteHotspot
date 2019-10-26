# group4project3

## Setup

- Type in `git checkout master`
- Type in `git pull origin master`
- Create database in PG Admin called **clt_hotspots**
- Open query tool, copy and paste text from **create_table.sql** and run the script
- Import **top_rated_restaurants.csv** into the **restaurants** table
- Import **lynx.csv** into the **lynx** table
- Import **lat_long.csv** into the **attractions** table

## Running the app

- Open **app.py** and modify `SQLALCHEMY_DATABASE_URI` to use your PostgreSQL username/password
- Open **config.js** in the **static** folder and put in your Mapbox API key
- In GitBash or Terminal, run the app by typing in `python app.py`
- Go to `localhost:5000` in your browser
