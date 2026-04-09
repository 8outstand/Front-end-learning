import { Button, DatePicker, Input, NavBar } from 'antd-mobile'
import Icon from '@/components/Icon'
import './index.scss'
import classNames from 'classnames'
import { billListData } from '@/contants'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { addBillList } from '@/store/modules/billstore'
import { useDispatch } from 'react-redux'
import dayjs from 'dayjs'

const New = () => {
  const navigate = useNavigate()
  const [billType, setBillType] = useState('pay')
  const [money, setMoney] = useState(0)
  //收集账单类型
  const [usefor,  setUsefor] = useState('')
  const dispatch = useDispatch()
  const moneyChange = (value) => {
    setMoney(value)
  } 
  // 保存账单
  const saveBill = () => {
    //收集表单数据
    const date ={
        type: billType,
        money: billType === 'pay' ? -money : +money,
        date: data,
        usefor: usefor,
    }
    console.log(date)
    dispatch(addBillList(date))
  }
  //存储选择的时间
  const [data, setData] = useState()
  //设置时间属性是否打开
  const [dataVisible , setDataVisible] = useState(false)
  //确定选择时间
  const dateConfirm = (value) => {
    console.log(value);
    setData(value)
    setDataVisible(false)
  }
  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}>
        记一笔
      </NavBar>

      <div className="header">
        <div className="kaType">
          <Button
            shape="rounded"
            className={classNames(billType === 'pay' ? 'selected': '')}
            onClick={() => setBillType('pay')}
          >
            支出
          </Button>
          <Button
            className={classNames(billType === 'income' ? 'selected': '')}
            shape="rounded"
            onClick={() => setBillType('income')}
          >
            收入
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date">
              <Icon type="calendar" className="icon" />
              <span className="text" onClick={() => setDataVisible(true)}>{dayjs(data).format('YYYY-MM-DD')}</span>
              <DatePicker
                className="kaDate"
                title="记账日期"
                max={new Date()}
                visible = {dataVisible}
                onConfirm={dateConfirm}
              />
            </div>
            <div className="kaInput">
              <Input
                className="input"
                placeholder="0.00"
                type="number"
                value={money}
                onChange={moneyChange}
              />
              <span className="iconYuan">¥</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {billListData[billType].map(item => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map(item => {
                  return (
                    //selected
                    <div
                      className={classNames(
                        'item',
                        usefor === item.type ? 'selected' : ''
                      )}
                      key={item.type}
                      onClick={() => setUsefor(item.type)} 
                    >
                      <div className="icon">
                        <Icon type={item.type} />
                      </div>
                      <div className="text">{item.name}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="btns">
        <Button className="btn save" onClick={saveBill}>
          保 存
        </Button>
      </div>
    </div>
  )
}

export default New