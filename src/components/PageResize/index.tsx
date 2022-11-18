import 'antd/dist/antd.css';

import React, {
  useEffect, useRef, useState,
  MutableRefObject, Dispatch, SetStateAction, CSSProperties
} from 'react';

import { Layout, Menu, Breadcrumb } from 'antd';
import { DesktopOutlined, PieChartOutlined, FileOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { throttle } from 'lodash';


const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;

// 实现元素左右拖拽的Hook逻辑
function useLeft2Right(
  resizeLine: MutableRefObject<HTMLDivElement | null>,
  setNavWidth: Dispatch<SetStateAction<number>>
) {
  useEffect(() => {
    let { current } = resizeLine;

    let mouseDown = (e: MouseEvent) => {
      let resize = throttle(function (e: MouseEvent) {
        if (e.clientX > 150 && e.clientX < 400) {
          setNavWidth(e.clientX);
        }
      }, 100);

      let resizeUp = function () {
        document.removeEventListener("mousemove", resize);
        document.removeEventListener("mouseup", resizeUp);
      }

      document.addEventListener("mousemove", resize);
      document.addEventListener("mouseup", resizeUp)
    }

    (current as HTMLElement).addEventListener("mousedown", mouseDown);

    return function () {
      (current as HTMLElement).removeEventListener("mousedown", mouseDown);
    }
  }, []);
}

// 可以拖拽改变宽度的侧边栏组件
function DragSider(props: { children: JSX.Element | JSX.Element[] }) {
  let { children } = props;

  let [navWidth, setNavWidth] = useState(200);
  let resizeLine = useRef<HTMLDivElement>(null);

  useLeft2Right(resizeLine, setNavWidth);

  let asideStyle: CSSProperties = {
    width: navWidth,
  };

  let resizeLineStyle: CSSProperties = {
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 100,
    width: 3,
    height: "100%",
    backgroundColor: "white",
    cursor: "col-resize"
  };

  let rootClassName = "ant-layout-sider ant-layout-sider-dark ant-layout-sider-has-trigger"


  return (
    <aside className={rootClassName} style={asideStyle}>
      <div ref={resizeLine} style={resizeLineStyle} />
      {children}
    </aside>
  )
}


class PageResize extends React.Component<any, any> {
  render() {
    return (
      <React.StrictMode>
        <Layout style={{ minHeight: '100vh', userSelect: "none" }} hasSider={true}>
          <DragSider>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1" icon={<PieChartOutlined />}>
                Option 1
              </Menu.Item>
              <Menu.Item key="2" icon={<DesktopOutlined />}>
                Option 2
              </Menu.Item>
              <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                <Menu.Item key="3">Tom</Menu.Item>
                <Menu.Item key="4">Bill</Menu.Item>
                <Menu.Item key="5">Alex</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                <Menu.Item key="6">Team 1</Menu.Item>
                <Menu.Item key="8">Team 2</Menu.Item>
              </SubMenu>
              <Menu.Item key="9" icon={<FileOutlined />} />
            </Menu>
          </DragSider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content style={{ margin: '0 16px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
              </Breadcrumb>
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                Bill is a cat.
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
        </Layout>
      </React.StrictMode>
    );
  }

}


export default PageResize;