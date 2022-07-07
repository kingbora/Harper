import React from "react";
import withIndexView from "@cus/controllers/dist/index";
import style from "./style.module.less";
import useCtrl from "@cus/business/dist/hooks/useCtrl";
import { IndexController } from "@cus/controllers/dist/index";

function IndexView() {
  const ctrl = useCtrl<IndexController>();
  return (
    <div className={style.red}>
      哈哈哈，<span onClick={ctrl.markIt} className={style.blue}>成功啦</span>
    </div>
  );
}

export default withIndexView(IndexView);