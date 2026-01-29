import { Button, FloatButton, Divider} from 'antd';
import { StarOutlined, StarFilled, StarTwoTone } from '@ant-design/icons';
import Flex from './Flex';



import './App.css'

function App() {

  return (
    <>
      <div>
        <Button type="primary" disabled>Primary Button</Button>
        <Button type="dashed">Dashed Button</Button>
        <Button type="text" color="green" variant="outlined">Text Button</Button>
        <Button type="link">Link Button</Button>
      </div>
      <Divider size='large' titlePlacement="start" variant="dotted" style={{ borderColor: '#7cb305' }}>Divider with Title
      </Divider>
      <div>
        <Button type="primary"  size="large" loading={true}> Large Primary Button</Button>
        {/* <FloatButton type="primary"> Large Primary Button</FloatButton> */}
        <FloatButton type="primary" shape="square"> Large Primary Button</FloatButton>
        <FloatButton.Group shape="square" style={{ insetInlineEnd: 94 }}>
        <FloatButton />
        <FloatButton.BackTop visibilityHeight={0} />
        </FloatButton.Group>
        <StarOutlined />
        <StarFilled />
        <StarTwoTone twoToneColor="#eb2f96" />
      </div>
      <Flex />
    </>
  )
}

export default App
