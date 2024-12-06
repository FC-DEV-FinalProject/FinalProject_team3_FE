import classNames from 'classnames/bind'

import TabButton from '@/shared/ui/tabs/tab-button'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

export interface TabItemModel {
  id: string
  label: string
  icon?: React.FC<React.SVGProps<SVGSVGElement>>
  content?: React.ReactElement
}

interface Props<T extends string> {
  tabs: TabItemModel[]
  activeTab: T
  onTabChange: (id: T) => void
}

const Tabs = <T extends string>({ tabs, activeTab, onTabChange }: Props<T>) => {
  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content

  return (
    <>
      <ul className={cx('tab-list')}>
        {tabs.map(({ id, label, icon: Icon }) => (
          <li key={id}>
            <TabButton isActive={id === activeTab} onClick={() => onTabChange(id as T)}>
              {Icon && <Icon className={cx('icon')} />}
              {label}
            </TabButton>
          </li>
        ))}
      </ul>
      {activeTabContent && <div>{activeTabContent}</div>}
    </>
  )
}

export default Tabs
