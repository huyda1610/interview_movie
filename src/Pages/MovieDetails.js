import React from 'react'
import { Col, Row, Descriptions, Skeleton, Rate  } from 'antd';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

const MovieDetails = () => {
  const { movieDetails, detailsIsLoading } = useSelector((state) => state.movieSlice);

  if (detailsIsLoading || movieDetails.length === 0) {
    return (    
      <div>
        <Skeleton/>
      </div>
    )
  }

  return (
    <>
      <Row justify={"center"}>
        <Col xs={24} sm={24} md={16} lg={10} xl={10}>
          <LazyLoadImage  
            alt={movieDetails.original_title} 
            src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`} 
            effect="blur" 
            width={"100%"} 
            height={700}
            delayTime={1000}
          />
        </Col>
        <Col xs={24} sm={24} md={14} lg={14} xl={14} style={{ paddingLeft: "10px"}}>
          <Descriptions labelStyle={{ color: "#18b7ff", fontWeight: "900", fontSize: 20 }} contentStyle={{ fontSize: 20 }}>
            <Descriptions.Item label="Name" span={3} contentStyle={{ fontWeight: "900" }}>{movieDetails.original_title}</Descriptions.Item>
            <Descriptions.Item label="Ratings" span={3}>
              <Rate disabled count={10} allowHalf value={movieDetails.vote_average.toFixed(1)}/>
              <span className="ant-rate-text">{movieDetails.vote_average.toFixed(1)}/10</span>
            </Descriptions.Item>
            {
              movieDetails.belongs_to_collection !== null && <Descriptions.Item label="Collection" span={3}>{movieDetails.belongs_to_collection.name}</Descriptions.Item>
            }
            <Descriptions.Item label="Budget" span={3}>$ {movieDetails.budget.toLocaleString()}</Descriptions.Item>
            <Descriptions.Item label="Genres" span={3}>
              {movieDetails.genres.map((item) => {
                return (
                  `${item.name} ,`
                );
              })}
            </Descriptions.Item>
            {
              movieDetails.homepage !== "" &&        
              <Descriptions.Item label="HomePage" span={3}>
                <a href={movieDetails.homepage}>{movieDetails.homepage}</a>
              </Descriptions.Item>
            }
            <Descriptions.Item label="Language" span={3}>{movieDetails.original_language}</Descriptions.Item>
            <Descriptions.Item label="Overview" span={3}>{movieDetails.overview}</Descriptions.Item>
            <Descriptions.Item label="Production Company" span={3}>
              {movieDetails.production_companies.map((item) => {
                return (
                  `${item.name} , `
                );
              })}
            </Descriptions.Item>
            <Descriptions.Item label="Production Country" span={3}>
              {movieDetails.production_countries.map((item) => {
                return (
                  `${item.name} `
                );
              })}
            </Descriptions.Item>
            <Descriptions.Item label="Release Day" span={3}>{dayjs(movieDetails.release_date).format("DD-MM-YYYY")}</Descriptions.Item>
            <Descriptions.Item label="Revenuey" span={3}>$ {movieDetails.revenue.toLocaleString()}</Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>        
    </>
  )
}

export default MovieDetails