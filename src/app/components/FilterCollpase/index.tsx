/* eslint-disable no-nested-ternary */
import { FC, ReactNode } from 'react';
import { useCollapse } from 'react-collapsed';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';

import { Card } from '@/app/components/ui/Card';

import { RenderIf } from '../RenderIf';
import { Col, Row } from '../ui';
import { Button } from '../ui/Button';

type FilterCollapseProps = {
  onHandleSubmit: any;
  inputSearch: ReactNode;
  children?: ReactNode;
};

export const FilterCollapse: FC<FilterCollapseProps> = ({
  onHandleSubmit,
  children,
  inputSearch,
}) => {
  const { getCollapseProps, getToggleProps, isExpanded, setExpanded } =
    useCollapse({
      duration: 1000,
    });

  const inputSearchLg = children && !isExpanded ? 21 : isExpanded ? 23 : 22;
  return (
    <Card bordered={false}>
      <Row gutter={[16, 16]} justify='space-between'>
        <Col span={24} lg={inputSearchLg}>
          {inputSearch}
        </Col>
        <RenderIf condition={!isExpanded}>
          <Col
            span={24}
            sm={!children ? 24 : 20}
            md={!children ? 24 : 21}
            lg={2}
          >
            <Button
              onClick={onHandleSubmit}
              htmlType='button'
              size='large'
              className='w-full'
            >
              Filtrar
            </Button>
          </Col>
        </RenderIf>

        <RenderIf condition={!!children}>
          <Col span={24} sm={4} md={3} lg={1}>
            <Button
              {...(getToggleProps() as any)}
              htmlType='button'
              size='large'
              icon={isExpanded ? <FaChevronUp /> : <FaChevronDown />}
              className='!w-full'
            />
          </Col>
          <Col span={24} {...getCollapseProps()}>
            <Row gutter={[16, 16]} justify='center'>
              {children}
            </Row>

            <Row gutter={[16, 16]} justify='center'>
              <Col span={24} md={4}>
                <Button
                  onClick={onHandleSubmit}
                  htmlType='button'
                  size='large'
                  className='w-full'
                >
                  Filtrar
                </Button>
              </Col>

              <Col span={24} md={4}>
                <Button
                  onClick={() => setExpanded(false)}
                  danger
                  type='primary'
                  htmlType='button'
                  size='large'
                  className='w-full'
                >
                  Cancelar
                </Button>
              </Col>
            </Row>
          </Col>
        </RenderIf>
      </Row>
    </Card>
  );
};
