import React, {useRef} from 'react'
import { Layout, Typography,Col, Row, Tabs, Segmented, Input, Grid, Pagination, Space } from 'antd';
import MovieLists from './MovieLists';
import { getSelectedTab, getSelectedSegment, getSearchMovie, getPaginationPage} from '../Redux/movieSlice';
import { useDispatch } from 'react-redux';
import { AppstoreOutlined, BarsOutlined  } from '@ant-design/icons';
import { Footer } from 'antd/es/layout/layout';
import { useSelector } from 'react-redux';

const { Header, Content } = Layout;
const { Title } = Typography;
const { Search } = Input;
const { useBreakpoint } = Grid;

const HomePage = () => {
  const { paginationPage } = useSelector((state) => state.movieSlice);

  const dispatch = useDispatch();
  const timeoutRef = useRef();
  const {xs} = useBreakpoint();

  const handleOnChange = (key) => {
    dispatch(getSelectedTab(key));
  }
  const handleSelectSegment = (value) => {
    dispatch(getSelectedSegment(value));
  }
  const handleOnSearch = (value) => {
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      dispatch(getSearchMovie(value));
    }, 300);
  }

  const handlePaginationChange = (value) => {
    dispatch(getPaginationPage(value));
  };
  return (
    <div>
      <Layout>
        <Header>
          <Row style={{ margin: '10px'}}>
            <Col xs={12} sm={12} md={8} lg={8} xl={8}>
              <Search
                placeholder="Search for a movies"
                allowClear
                style={{width: "70%"}}
                enterButton="Search"
                size="large"
                onSearch={handleOnSearch}
              />
            </Col>
            <Col xs={12} sm={12} md={8} lg={8} xl={8}><Title level={xs ? 3 : 1} type="danger" style={{textAlign: "center"}}>Movies APP</Title></Col>
            <Col xs={0} sm={0} md={8} lg={8} xl={8}></Col>
          </Row>
        </Header>
        <Tabs
            defaultActiveKey="1"
            onChange={handleOnChange}
            centered
            size="large"
            style={{outline: 'none', paddingTop: 20}}
            items={[
              {
                label: <Title level={3} style={{color: 'blue'}}>Now Playing</Title>,
                key: '1',
              },
              {
                label: <Title level={3} type="success">Top Rated</Title>,
                key: '2',
              },
            ]}
        />
        <Row justify="end">
          <Col>
            <Segmented
              size= 'large'
              onChange={handleSelectSegment}
              defaultValue="Kanban"
              options={[
                {
                  value: 'Kanban',
                  icon: <AppstoreOutlined />,
                },
                {
                  value: 'List',
                  icon: <BarsOutlined />,
                },
              ]}
            />
          </Col>
        </Row>
        <Content>
          <MovieLists/>
        </Content>
        <Footer>
        <Space style={{width: '100%', justifyContent: 'center'}}>
          <Pagination
            responsive
            defaultCurrent={1}
            current={paginationPage}
            total={50}
            onChange={handlePaginationChange}
          />
        </Space>
        </Footer>
      </Layout>
    </div>
  )
}

export default HomePage