import { useState, useEffect } from 'react';
import { Active } from "../../../models";

import { ClockCircleOutlined } from '@ant-design/icons';
import { Timeline } from 'antd';
import { Chart } from 'primereact/chart';
import { faFileCircleCheck, faFileEdit, faUsers, faUserAltSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { Dayjs } from 'dayjs';
import { Calendar } from 'antd';
import type { CalendarProps } from 'antd';

const ProfileDashboard = ({ active }: Props) => {
  // const { activeUser, reloadActiveUser } = useActiveUser();
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };
  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const data = {
      labels: [
        'Accounting Assistant',
        'APRN',
        'Billing Agent',
        'HR Assistant',
        'Psychiatrist MD',
        'TCM QA',
        'TCM Supervisor',
        'TCM',
        'Therapist QA',
        'Therapist Supervisor',
        'Therapist'
      ],
      datasets: [
        {
          data: [3, 1, 2, 1, 3, 5, 3, 10, 4, 3, 5],
          // backgroundColor: [
          //   documentStyle.getPropertyValue('--blue-500'),
          //   documentStyle.getPropertyValue('--yellow-500'),
          //   documentStyle.getPropertyValue('--green-500')
          // ],
          // hoverBackgroundColor: [
          //   documentStyle.getPropertyValue('--blue-400'),
          //   documentStyle.getPropertyValue('--yellow-400'),
          //   documentStyle.getPropertyValue('--green-400')
          // ]
        }
      ]
    };
    const options = {
      cutout: '50%',
      plugins: {
        legend: {
          display: false,
        }
      }
    };

    setChartData(data);
    setChartOptions(options);
  }, []);
  return (
    // <Watermark
    //   content={['SunissUp', '...when you have a dream']}
    // >
    <div className="flex flex-col w-full items-start justify-start">
      <div className="card w-full lg:card-side">
        <div className="flex flex-col w-full lg:flex-row">
          <div className="grid w-full">
            <div className="card">

              <div className='md:stats lg:stats md:bg-gray-100 lg:bg-gray-100'>

                <div className="stat w-full md:w-1/4 lg:w-1/4 border-b">
                  <div className="stat-figure text-secondary">
                    <div className="w-24">
                      <FontAwesomeIcon
                        icon={faFileEdit}
                        className="text-warning w-24 h-24"
                      />
                    </div>
                  </div>
                  <div className="stat-title"><b>Hirings</b></div>
                  <div className="stat-value">2</div>
                  <div className="stat-desc">People who are in the hiring process</div>
                </div>

                <div className="stat w-full md:w-1/4 lg:w-1/4 border-b">
                  <div className="stat-figure text-secondary">
                    <div className="w-24">
                      <FontAwesomeIcon
                        icon={faFileCircleCheck}
                        className="text-success w-24 h-24"
                      />
                    </div>
                  </div>
                  <div className="stat-title"><b>Applications</b></div>
                  <div className="stat-value">5</div>
                  <div className="stat-desc">People who aspire to be hired</div>
                </div>

                <div className="stat w-full md:w-1/4 lg:w-1/4 border-b">
                  <div className="stat-figure text-secondary">
                    <div className="w-24">
                      <Chart type="doughnut" data={chartData} options={chartOptions} className="w-full md:w-30rem" />
                    </div>
                  </div>
                  <div className="stat-title"><b>Staff</b></div>
                  <div className="stat-value flex">
                    5
                  </div>
                  <div className="stat-desc">People who are part of our team</div>
                </div>

                <div className="stat w-full md:w-1/4 lg:w-1/4 border-b">
                  <div className="stat-figure text-secondary">
                    <div className="w-24">
                      <FontAwesomeIcon
                        icon={faUserAltSlash}
                        className="text-gray-400 w-24 h-24"
                      />
                    </div>
                  </div>
                  <div className="stat-title"><b>Inactives</b></div>
                  <div className="stat-value">20</div>
                  <div className="stat-desc">People who are <br />part of our team</div>
                </div>
              </div>
              <div className="stat w-full md:w-1/4 lg:w-1/4 border-b">

                <Timeline
                  items={[
                    {
                      children: 'Create a services site 2015-09-01',
                    },
                    {
                      children: 'Solve initial network problems 2015-09-01',
                    },
                    {
                      dot: <ClockCircleOutlined className="timeline-clock-icon bg-gray-100" />,
                      color: 'red',
                      children: 'Technical testing 2015-09-01',
                    },
                    {
                      children: 'Network problems being solved 2015-09-01',
                    },
                  ]}
                />
              </div>

              <div>
                <Calendar
                  onPanelChange={onPanelChange}
                  fullscreen={false}
                  className='w-1/2'
                />
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
    // </Watermark>
  );
};
type Props = {
  active?: Active;
};

export { ProfileDashboard };
