
if (/green/.test(location.href))
  require('./mint-theme.less');
else if (/red/.test(location.href))
  require('./red-theme.less');
else
  require('./blue-theme.less')
