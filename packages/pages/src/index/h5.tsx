import React from "react";
import withIndexView from "@cus/controllers/dist/index";
import * as style from "./style.less";

function IndexView() {
  return (
    <div className={style.red}>哈哈哈，成功啦</div>
  );
}

export default withIndexView(IndexView);