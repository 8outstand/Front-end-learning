import { NavBar, DatePicker } from "antd-mobile";
import "./index.scss";
import { useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import _ from "lodash";
import DailyBill from "./components/DayBill";
const Month = () => {
  //按月最数据分组
  const billList = useSelector((state) => state.bill.billList || []);
  const monthGroup = useMemo(() => {
    // 空值保护：如果 billList 不是数组/为空，直接返回空对象
    if (!Array.isArray(billList) || billList.length === 0) {
      return {};
    }
    //return 计算后的值
    return _.groupBy(billList, (item) => dayjs(item.date).format("YYYY-MM"));
  }, [billList]);
  // console.log(monthGroup);

  //控制弹窗的打开和关闭
  const [dateVisible, setDateVisible] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(() => {
    return dayjs().format("YYYY-MM");
  });
  const [currentMonthList, setMonthList] = useState([]);

  const monthResult = useMemo(() => {
    const list = currentMonthList || [];
    const pay = list
      .filter((item) => item.type === "pay")
      .reduce((a, c) => a + c.money, 0);
    const income = list
      .filter((item) => item.type === "income")
      .reduce((a, c) => a + c.money, 0);
    return {
      pay,
      income,
      balance: income + pay,
    };
  }, [currentMonthList]);

  useEffect(() => {
    const nowDate = dayjs().format("YYYY-MM");
    if (monthGroup[nowDate]) {
      setMonthList(monthGroup[nowDate]);
    }
  }, [monthGroup]);

  const dateConfirm = (data) => {
    // 关闭弹框
    setDateVisible(false);
    const month = dayjs(data).format("YYYY-MM");
    setMonthList(monthGroup[month] || []);
    setCurrentMonth(month);
  };

  //按照日来分组
  const dayGroup = useMemo(() => {
    const groupDate = _.groupBy(currentMonthList, (item) => dayjs(item.date).format("YYYY-MM-DD"));
    const dayList = Object.keys(groupDate);
    return {
      groupDate,
      dayList,
    };
  }, [currentMonthList]);
  // console.log(dayGroup);

  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick={() => setDateVisible(true)}>
            <span className="text">{currentMonth + ""}账单</span>
            <span
              className={classNames("arrow", dateVisible && "expand")}
            ></span>
          </div>
          {/* 统计区域 */}
          <div className="twoLineOverview">
            <div className="item">
              <span className="money">{monthResult.pay.toFixed(2)}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.income.toFixed(2)}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.balance.toFixed(2)}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            onCancel={() => setDateVisible(false)}
            onConfirm={dateConfirm}
            onClose={() => setDateVisible(false)}
            visible={dateVisible}
            max={new Date()}
          />
        </div>
        {/* 单日列表显示 */}
        <DailyBill />
        {
          dayGroup.dayList.map((item) => (
            <DailyBill key={item} date={item} billList={dayGroup.groupDate[item]} />
          ))
        }
      </div>
    </div>
  );
};

export default Month;
