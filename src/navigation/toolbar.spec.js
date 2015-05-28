describe('ToolbarCtrl', function() {
	var scope, ctrl, $state, $mdSidenav, loginSvcMock;

	beforeEach(module('flintAndSteel'));
	beforeEach(module('ui.router'));

	beforeEach(inject(function ($rootScope, $controller, _$state_, _$mdSidenav_, _loginSvcMock_) {
		scope = $rootScope.$new();
		$state = _$state_;
		$mdSidenav = _$mdSidenav_;
		loginSvcMock = _loginSvcMock_;

		ctrl = $controller('ToolbarCtrl', {
			$scope: scope,
			$state: $state,
			$mdSidenav: $mdSidenav,
			loginSvc: loginSvcMock
		});
	}));

	it('should exist', function() {
		expect(ctrl).toBeDefined();
	});

	describe('$scope.accountClick', function() {
		
		beforeEach(function() {
			spyOn($state, 'go');
		});

		it('should navigate to login if no user is logged in', function() {
			spyOn(loginSvcMock, 'isUserLoggedIn').and.callFake(function() {
				return false;
			});

			scope.accountClick();

			expect(loginSvcMock.isUserLoggedIn).toHaveBeenCalled();
			expect($state.go).toHaveBeenCalledWith('login');
		});

		it('should navigate to account if user is logged in', function() {
			spyOn(loginSvcMock, 'isUserLoggedIn').and.callFake(function() {
				return true;
			});

			scope.accountClick();

			expect(loginSvcMock.isUserLoggedIn).toHaveBeenCalled();
			expect($state.go).toHaveBeenCalledWith('account');
		});
	});
});