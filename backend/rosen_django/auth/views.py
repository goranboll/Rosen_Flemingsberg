from django.contrib.auth import authenticate, login
from django.http import HttpResponseRedirect
def login(request):
    template = loader.get_template('auth/login.html')
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(username=username, password=password)
    if user is not None:
        if user.is_active:
            login(request, user)
             return HttpResponseRedirect("/site")
        else:
            # Return a 'disabled account' error message
    else:
        # Return an 'invalid login' error message.