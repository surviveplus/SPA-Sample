test("PlusArguments 正常系 引数が1と2と3の時に6が返ること", function () {
    var args = {
        first: 1,
        second: 2,
        third: 3,
    };
    var expected = 6;
    var actual = TargetClassName.PlusArguments(args.first, args.second, args.third);
    equal(actual, expected);
});
test("PlusArguments 異常系 引数が11と100と1000の時に例外がスローされること", function () {
    var args = {
        first: 11,
        second: 100,
        third: 1000,
    };
    raises(function () {
        var actual = TargetClassName.PlusArguments(args.first, args.second, args.third);
    }, Error);
});
//# sourceMappingURL=targetFileName.test.js.map