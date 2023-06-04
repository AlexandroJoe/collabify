import React, { useState, useCallback } from "react";
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  ConnectionLineType,
} from "react-flow-renderer";
import { nodes as initialNodes, edges as initialEdges } from "./elements";
import { Button, Modal, Input, Form, Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";

function ReactFlowRenderer() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteDropdownVisible, setDeleteDropdownVisible] = useState(false);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: ConnectionLineType.SmoothStep,
            animated: true,
            style: { stroke: "red" },
          },
          eds
        )
      ),
    [setEdges]
  );

  const getNodeId = () => Math.random();

  function onInit() {
    console.log("Logged");
  }

  function displayCustomNamedNodeModal() {
    setIsModalVisible(true);
  }

  function handleCancel() {
    setIsModalVisible(false);
  }

  function handleOk(data) {
    onAdd(data.nodeName);
    setIsModalVisible(false);
  }

  const onAdd = useCallback(
    (data) => {
      const newNode = {
        id: String(getNodeId()),
        data: { label: data },
        position: {
          x: 50,
          y: 0,
        },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  function handleDelete(nodeId) {
    console.log(nodeId);
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) =>
      eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
    );
  }

  const handleDeleteClick = () => {
    setDeleteDropdownVisible(true);
  };

  const handleDeleteDropdownVisibleChange = (visible) => {
    setDeleteDropdownVisible(visible);
  };

  const handleDeleteMenuItemClick = () => {
    setDeleteDropdownVisible(false);
  };

  return (
    <div style={{ height: "100vh", margin: "10px" }}>
      <Modal title="Basic Modal" open={isModalVisible} onCancel={handleCancel}>
        <Form onFinish={handleOk} autoComplete="off" name="new node">
          <Form.Item label="Node Name" name="nodeName">
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <div className="buttons">
        <Button type="primary" onClick={displayCustomNamedNodeModal}>
          Add Node
        </Button>

        <Dropdown
          overlay={
            <Menu onClick={handleDeleteMenuItemClick}>
              {nodes.map((node) => (
                <Menu.Item key={node.id}>
                  <Button onClick={() => handleDelete(node.id)}>
                    {node.data.label}
                  </Button>
                </Menu.Item>
              ))}
            </Menu>
          }
          open={deleteDropdownVisible}
          onOpenChange={handleDeleteDropdownVisibleChange}
        >
          <Button type="primary" onClick={handleDeleteClick}>
            Delete <DownOutlined />
          </Button>
        </Dropdown>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={onInit}
        fitView
        attributionPosition="bottom-left"
        connectionLineType={ConnectionLineType.SmoothStep}
      />
    </div>
  );
}

export default ReactFlowRenderer;
