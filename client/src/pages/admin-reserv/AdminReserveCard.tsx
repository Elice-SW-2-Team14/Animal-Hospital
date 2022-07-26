import React, { useEffect, useState } from "react";
import { InfoCard, TextContainer } from "../../components/Liststyle";
import { Column } from "../user-reserv/ReserveStyle";
import { CustomAxiosGet } from "../../common/CustomAxios";
import AdminReserveModal from "./AdminReserveModal";

const AdminReserveCard = () => {
  const [reserveData, setReserveData] = useState<any>();

  //TODO : 페이지네이션 적용시켜야함
  const getFetchData = (): Promise<any> =>
    new Promise(async (resolve, reject) => {
      const result = await CustomAxiosGet.get(
        "/reservation/admin/list?page=1&perPage=35"
      );
      setReserveData(result.data.data.ReservationsInfo);
    });

  useEffect(() => {
    getFetchData();
  }, []);

  // TODO : 렌더링이 늦게되는 문제
  const adminInfoContainer = () => {
    const res = [];

    for (let i = 0; i < 35; i++) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      res.push(
        <TextContainer key={i}>
          <Column>{reserveData?.customerInfoes[i].email}</Column>
          <Column>{reserveData?.customerInfoes[i].userName}</Column>
          <Column>{reserveData?.Reservations[i].hospital}</Column>
          <Column>{reserveData?.Reservations[i].rezDate}</Column>
          <Column>
            <AdminReserveModal reserveData={reserveData} idx={i} />
          </Column>
        </TextContainer>
      );
    }
    return res;
  };

  return (
    <InfoCard>
      <>{adminInfoContainer()}</>
    </InfoCard>
  );
};

export default AdminReserveCard;
