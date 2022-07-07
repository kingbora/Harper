import React from "react";
import withIndexView from "@cus/controllers/dist/index";
import style from "./style.module.less";

function IndexView() {
  return (
    <div className={style.red}>
      哈哈哈，<span className={style.blue}>成功啦</span>
    </div>
  );
}

export default withIndexView(IndexView);