import React,{ useEffect, useState } from 'react'
import { Card, Col, Row, Modal,message, List, Typography, Grid, Skeleton} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { getMovieNowPlaying, getMovieDetails, getMovieTopRated } from '../Redux/movieSlice';
import { Detector } from "react-detect-offline";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import MovieDetails from './MovieDetails';
import dayjs from 'dayjs';
import PullToRefresh from 'react-simple-pull-to-refresh';

const { Meta} = Card;
const { Title,Text } = Typography;
const { useBreakpoint } = Grid;

const MovieLists = () => {
  const { movies, isLoading, selectedTab, selectedSegment, searchValue, paginationPage } = useSelector((state) => state.movieSlice);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const {md,sm} = useBreakpoint();

  useEffect(() => {
    if (selectedTab === "1") {
      dispatch(getMovieNowPlaying(paginationPage));
    } else {
      dispatch(getMovieTopRated(paginationPage));
    }
  }, [selectedTab, paginationPage]);

  const handleClick = (movieId) => {
    dispatch(getMovieDetails(movieId));
    setIsModalOpen(true);
  };

  const searchData = [...movies].filter((item) => item.original_title.toLowerCase().replace(/\s+/g,"")
    .includes(searchValue.toLocaleLowerCase().replace(/\s+/g,"")));

  const handleCheckOnline = (online) => {
    !online && setTimeout(() => {
      messageApi.open({
        type: 'error',
        content: 'No Connection !!! Please check your internet connection.',
      })
    }, 3000);
  };

  const handleRefresh = () => {
    if (selectedTab === "1") {
      dispatch(getMovieNowPlaying(paginationPage));
    } else {
      dispatch(getMovieTopRated(paginationPage));
    }
  };

  if (searchData.length === 0) {
    return (
      <>
        {contextHolder}
        <Row justify={"center"}>
          <Col style={{ padding: "20px"}}>
            <Title type="warning" style={{textAlign: "center"}}>There are no movies that matched your query</Title>
          </Col>
        </Row>
      </>
    )
  }

  if (isLoading || movies.length === 0) {
    return (
      <>
        {contextHolder}
        {
          selectedSegment === "Kanban"
          ?
            <Row justify={"center"}>
              <Col span={6} style={{ padding: "20px"}}>
                <Card loading>
                  <Meta title="Skeleton" description="Skeleton" />
                </Card>
              </Col>
              <Col span={6} style={{ padding: "20px"}}>
                <Card loading>
                  <Meta title="Skeleton" description="Skeleton" />
                </Card>
              </Col>
              <Col span={6} style={{ padding: "20px"}}>
                <Card loading>
                  <Meta title="Skeleton" description="Skeleton" />
                </Card>
              </Col>
              <Col span={6} style={{ padding: "20px"}}>
                <Card loading>
                  <Meta title="Skeleton" description="Skeleton" />
                </Card>
              </Col>
            </Row>
          :
          <Row justify={"center"}>
            <Col span={14}>
              <Skeleton/>
            </Col>
          </Row>
        }

      </>
    )
  }

  return (
    <>
      <Detector render={({online}) => (
        handleCheckOnline(online)
      )}/>
      {contextHolder}
      {
        selectedSegment === "Kanban"
        ? 
          <PullToRefresh 
            onRefresh={() => handleRefresh()} 
            pullingContent={<h1 style={{textAlign: 'center'}}>↓ Pull Down To Refresh ↓</h1>}
            >
            <Row justify={"center"}>
              {searchData.map((item) => {
                return (
                  <Col xs={24} sm={16} md={12} lg={8} xl={6} key={item.id} style={{ padding: "20px"}}>
                    <Card
                      hoverable
                      onClick={() => handleClick(item.id)}
                      cover={<LazyLoadImage  
                        alt={item.original_title} 
                        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} 
                        effect="blur" 
                        width={"100%"} 
                        height={"500"}
                      />}
                    >
                      <Meta title={item.original_title} description={"Release Day:  " + dayjs(item.release_date).format("dddd, MMMM DD, YYYY")} />
                    </Card>
                  </Col>
                )
              })}
            </Row>
        </PullToRefresh>
      :
        <PullToRefresh 
          onRefresh={() => handleRefresh()} 
          pullingContent={<h1 style={{textAlign: 'center'}}>↓ Pull Down To Refresh ↓</h1>}
        >
          <Row justify={"center"}>
            <Col span={14}>
              <List
                itemLayout="vertical"
                size="small"
                dataSource={searchData}
                renderItem={(item) => (
                  <List.Item
                    key={item.id}
                    extra={
                      <LazyLoadImage  
                        alt={item.original_title} 
                        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} 
                        effect="blur" 
                        width={"100%"} 
                        height={300}
                      />
                    }
                  >
                    <List.Item.Meta
                      title={<div onClick={() => handleClick(item.id)}>{item.original_title}</div>}
                      description={"Release Day:  " + dayjs(item.release_date).format("dddd, MMMM DD, YYYY")}
                    />
                    {sm && <Text style={{fontSize: md ? 18 : 12}}>{md ? item.overview : item.overview.length < 100 ? item.overview.substring(0,100) : item.overview.substring(0,100) + " ..."}</Text>}
                  </List.Item>
                )}  
              />  
            </Col>
          </Row>
        </PullToRefresh>
      }



      <Modal width={1200} open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null}>
        <MovieDetails/>
      </Modal>
    </>
  )
}

export default MovieLists