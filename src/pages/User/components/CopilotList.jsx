import { useEffect, useState } from "react";
import { Table, Badge, message } from "antd";
import moment from 'moment';
import { getCopilotList} from "../router";
import { Content } from "antd/es/layout/layout";
import { DIRECTION_LIST, ROUND_LIST } from "../../../constant";
import { fetchCompanyList } from "../../../router";
import { useNavigate } from 'react-router-dom';


const CopilotList = () => {
  useEffect(()=> {
    getListData();
  },[]);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [company,setCompany] = useState('');
  const [round, setRound] = useState('');
  const [dataSource, setDataSource] = useState([]);
  const [companyList, setCompanyList] = useState([{value: '', label: ''}]);

  const navigate = useNavigate();
  
  useEffect(()=> {
    getListData();
  },[page, limit, company, round]);

  const  getListData = async () => {
    const params = {
      page: page,
      limit: limit,
      company: company,
      round: round
    };
    await getCopilotList(params).then((res) => {
      console.log(res);
      if (res.status === 200) {
        setDataSource(res.data.data.record_list);
      }
    }).catch((err) => {
      console.log('err:', err);
      message.error('获取辅助面试列表失败');
    });
  };

  const getCompanyList = async () => {
    const list = fetchCompanyList();
    setCompanyList(list);
  };

  const navigateToDetail = (id) => {
    navigate(`/user/interviewDetail/${id}`);
  };
  
  const columns = [
    {
      title: '公司',
      dataIndex: 'company',
      key: 'company',
    },{
      title: '方向',
      dataIndex: 'direction',
      key: 'direction',
    },{
      title: '轮数',
      dataIndex: 'round',
      key: 'round',
    },{
      title: '开始时间',
      dataIndex: 'start_time',
      key: 'start_time',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.interview_time - b.interview_time,
      render: (timestamp) => 
        moment(Number(timestamp)).format('YYYY-MM-DD HH:mm:ss'),
    },{
      title: '耗时（分钟）',
      dataIndex: 'minutes',
      key: 'minutes',
    },{
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: () => <Badge status="success" text="已完成" />,
    },{
      title: '操作',
      dataIndex: '',
      key: 'x',
      render: (_, { id }) => <a onClick={() => navigateToDetail(id)}>编辑</a>,
    },
  ];
  return (
    <Table dataSource={dataSource} columns={columns} />
  );
  
};
export default CopilotList;