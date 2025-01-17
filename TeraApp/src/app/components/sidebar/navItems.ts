export const navItems = [
    {
      parent: 'Masters',
      icon: '', 
      isOpen: true, 
      children: [
        { title: 'Company', link: '/layout/CompanyList' },
        { title: 'Role Master', link: '/layout/RoleList' },
        { title: 'Financial Year', link: '/layout/FinancialYearList' },

      ],
    },
    {
      parent: 'Transactions',
      icon: '',
      isOpen: false,
      children: [
        { title: 'Page 1', link: '/layout/page1' },
        { title: 'Page 2', link: '/layout/page2' },
        { title: 'Page 3', link: '/layout/page3' },
      ],
    },
  ];