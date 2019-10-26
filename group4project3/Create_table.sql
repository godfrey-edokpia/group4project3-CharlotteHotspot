DROP TABLE IF EXISTS lynx;
DROP TABLE IF EXISTS restaurants;
DROP TABLE IF EXISTS attractions;
DROP TABLE IF EXISTS top_rated_restaurant;
DROP TABLE IF EXISTS tourist_attraction;
DROP TABLE IF EXISTS hotspots;

-- Create TABLE  LYNX
CREATE table lynx (
  id SERIAL PRIMARY KEY,
  Name VARCHAR(100) NOT NULL,
  Latitude VARCHAR (100)NOT NULL,
  Longitude VARCHAR(100) NOT NULL,
  Category VARCHAR(100)NOT NULL
);

-- Create table TOP RATED RESTAURANT
CREATE TABLE restaurants (
  id SERIAL PRIMARY KEY,
  Name VARCHAR(100) NOT NULL,
  Latitude VARCHAR(100) NOT NULL,
  Longitude VARCHAR(100) NOT NULL,
  Category VARCHAR (255) NOT NULL
);

-- Create table  TOURIST ATTRACTION
CREATE TABLE attractions (
  id SERIAL PRIMARY KEY,
  Name VARCHAR(100) NOT NULL,
  Latitude VARCHAR(100) NOT NULL,
  Longitude VARCHAR(100) NOT NULL
);

-- Create table hotspots
CREATE TABLE hotspots (
  id SERIAL PRIMARY KEY,
  Name VARCHAR(100) NOT NULL,
  Latitude VARCHAR(100) NOT NULL,
  Longitude VARCHAR(100) NOT NULL,
  Category VARCHAR (255) NOT NULL
);