var cssFile = chrome.extension.getURL('css/trello-swimlanes.css'),
  board = document.getElementById('board'),
  laneIndicator = '\ud83c\udfca';
  boardSwimlanesActiveClass = 'swimlanes';

function insertCss() {
  if (document.getElementById('swimlanescss') === null) {
    var css = document.createElement('link');
    css.id = 'swimlanescss';
    css.type = 'text/css';
    css.rel = 'stylesheet';
    css.href = cssFile;
    document.getElementsByTagName('head')[0].appendChild(css);
  }
}

var swimlanesExist = false;

function findSwimlanes() {
    var headerNames = document.querySelectorAll('.list-wrapper .list-header-name');
    
    for (let headerName of headerNames)
    {  
        var headerNameValue = headerName.value;
        var closestListWrapper = headerName.closest('.list-wrapper');
        
        if (headerNameValue.indexOf(laneIndicator) > -1)
        {
            swimlanesExist = true;
            if (closestListWrapper) 
            {
                closestListWrapper.classList.add('swimlane-start');
                var laneTitle = headerNameValue.substr(headerNameValue.indexOf(laneIndicator)).replace(laneIndicator,''); 
                if (laneTitle.length > 0)
                {
                    closestListWrapper.setAttribute('data-swimlane-title', laneTitle);
                }            
            }
        } else {
            if (closestListWrapper) 
            {
                closestListWrapper.classList.remove('swimlane-start');
            }
        }
    }
    
    if (swimlanesExist)
    {
        insertCss();
        for (var header of headerNames) {
          header.addEventListener('change',findSwimlanes,false);
        }        
    }
}
findSwimlanes();

chrome.storage.sync.get('isInactive', function (result) {
  if (result.isInactive) {
    board.classList.remove(boardSwimlanesActiveClass);
  } else  {
    board.classList.add(boardSwimlanesActiveClass);
  } 
});


